import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from '../../components/shared/form/Form';
import { Input } from '../../components/shared/input/Input';
import { Select } from '../../components/shared/select/Select';
import selectOptions from '../../utils/selectOptions';
import moment from 'moment';
import CardTitle from '../../components/shared/cardTitle/CardTitle';
import { useStore } from '../../components/storeProvider/StoreProvider';
import { getActiveCard, getCategory, getItemId } from '../../redux/activeCard/selectorsActiveCard';
import { setCard, setCategory, setInitialCard } from '../../redux/activeCard/sliceActiveCard';
import { findSpending } from '../../redux/dataLists/selectorsDataLists';
import { getSpendingOpts } from '../../redux/options/selectorOptions';
import ApiServicesClass from '../../services/apiServicesClass';
import { postSpendingOpt, getInitSpendingOpts } from '../../redux/options/sliceOptions';
import withOptionsCards from '../../components/HOCs/withOptionsCards';
import Button from '../../components/shared/button/Button';
import { getCategoryTitle } from '../../utils/helpers';
import Container from '../../components/shared/container/Container';
import Section from '../../components/shared/section/Section';
import BtnCategory from '../../components/btnCategory/BtnCategory';

const { outlaySets, currencySets } = selectOptions;

const api = new ApiServicesClass();
const buttonStyle = { minHeight: '1.6em' };
const CardSpendings = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  const { state } = useLocation();
  const id = useSelector(getItemId);
  const spendingOpts = useSelector(getSpendingOpts);
  const { date, time, outlay, total, currency } = useSelector(getActiveCard);

  console.log('spendingOpts', spendingOpts);
  const { onHandleSubmit } = useStore();
  const cardId = useSelector(getCategory);
  const cardData = useSelector(findSpending);

  const onHandleChange = e => {
    const { name, value } = e.target;
    dispatch(setCard({ [name]: value }));
  };
  const onFormSubmit = e => {
    e.preventDefault();
    const data = { date, time, outlay, total, currency };
    onHandleSubmit({ key: cardId, data, id: id ? id : null });
    id ? history.push({ pathname: state.from, state: state.data }) : history.push('/');
  };

  const onOpenCategories = () => {
    history.push({
      pathname: `/${match.url.split('/')[1]}/category`,
      state: {
        from: location,
      },
    });
  };

  useEffect(() => {
    const activeCard = {
      date: cardData ? cardData.date : moment(Date.now()).format('YYYY-MM-DD'),
      time: cardData ? cardData.time : moment(Date.now()).format('HH:mm'),
      outlay: cardData ? cardData.outlay : '',
      total: cardData ? cardData.total : '',
      currency: cardData ? cardData.currency : currencySets.options[0].value,
    };
    !date && dispatch(setInitialCard(activeCard));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(setCard({ outlay: outlay ? outlay : spendingOpts[0]?.value }));
    // eslint-disable-next-line
  }, [spendingOpts[0]?.value, outlay]);

  return (
    <Section>
      <Container>
        <Form onHandleSubmit={onFormSubmit}>
          <CardTitle title="Расходы" />
          <Input title="День" onChange={onHandleChange} type="date" value={date} name="date" />
          <Input title="Время" onChange={onHandleChange} type="time" value={time} name="time" />
          <BtnCategory title={getCategoryTitle(outlay, spendingOpts)} onClick={onOpenCategories} />
          {/* <Select value={outlay} onChange={onHandleChange} sets={outlaySets} /> */}
          <Input title="Сумма" onChange={onHandleChange} type="text" value={total} placeholder="Введите сумму" name="total" />
          <Select onChange={onHandleChange} sets={currencySets} />
        </Form>
      </Container>
    </Section>
  );
};
export default withOptionsCards(CardSpendings);
