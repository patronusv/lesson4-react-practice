import React, { useEffect, useState } from 'react';
import { Form } from '../../components/shared/form/Form';
import { Input } from '../../components/shared/input/Input';
import { Select } from '../../components/shared/select/Select';
import selectOptions from '../../utils/selectOptions';
import moment from 'moment';
import CardTitle from '../../components/shared/cardTitle/CardTitle';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useStore } from '../../components/storeProvider/StoreProvider';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveCard, getCategory, getItemId } from '../../redux/activeCard/selectorsActiveCard';
import { setCard, setCategory, setInitialCard } from '../../redux/activeCard/sliceActiveCard';
import { findIncome } from '../../redux/dataLists/selectorsDataLists';
import withOptionsCards from '../../components/HOCs/withOptionsCards';
import { getIncomeOpts } from '../../redux/options/selectorOptions';
import Button from '../../components/shared/button/Button';

const { incomeSets, currencySets } = selectOptions;

const CardIncome = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();
  const { state } = useLocation();
  const id = useSelector(getItemId);
  const cardId = useSelector(getCategory);
  const incomeOpts = useSelector(getIncomeOpts);
  const { date, time, income, total, currency } = useSelector(getActiveCard);
  const cardData = useSelector(findIncome);

  const { onHandleSubmit } = useStore();
  const onHandleChange = e => {
    const { name, value } = e.target;
    dispatch(setCard({ [name]: value }));
  };
  const onFormSubmit = e => {
    e.preventDefault();
    const data = { date, time, income, total, currency };
    onHandleSubmit({ key: cardId, data, id: id ? id : null });
    id ? history.push({ pathname: state.from, state: state.data }) : history.push('/');
  };

  const onOpenCategories = () => {
    history.push({
      pathname: `${match.url.split('/')[1]}/category`,
      state: {
        from: location,
      },
    });
  };

  useEffect(() => {
    const activeCard = {
      date: cardData ? cardData.date : moment(Date.now()).format('YYYY-MM-DD'),
      time: cardData ? cardData.time : moment(Date.now()).format('HH:mm'),
      income: cardData ? cardData.income : incomeOpts[0]?.value,
      total: cardData ? cardData.total : '',
      currency: cardData ? cardData.currency : currencySets.options[0].value,
    };
    !date && dispatch(setInitialCard(activeCard));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(setCard({ income: incomeOpts[0]?.value }));
    // eslint-disable-next-line
  }, [incomeOpts[0]?.value]);

  return (
    <div>
      <Form onHandleSubmit={onFormSubmit}>
        <CardTitle title="Доходы" />
        <Input title="День" onChange={onHandleChange} type="date" value={date} name="date" />
        <Input title="Время" onChange={onHandleChange} type="time" value={time} name="time" />
        <Button title={!income ? 'Выберите категорию' : income} onClick={onOpenCategories} />
        {/* <Select value={income} onChange={onHandleChange} sets={incomeSets} /> */}
        <Input title="Сумма" onChange={onHandleChange} type="text" value={total} placeholder="Введите сумму" name="total" />
        <Select onChange={onHandleChange} sets={currencySets} />
      </Form>
    </div>
  );
};
export default withOptionsCards(CardIncome);
