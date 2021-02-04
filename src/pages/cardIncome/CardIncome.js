import React, { useEffect, useState } from 'react';
import { Form } from '../../components/shared/form/Form';
import { Input } from '../../components/shared/input/Input';
import { Select } from '../../components/shared/select/Select';
import selectOptions from '../../utils/selectOptions';
import moment from 'moment';
import CardTitle from '../../components/shared/cardTitle/CardTitle';
import { useHistory, useLocation } from 'react-router-dom';
import { useStore } from '../../components/storeProvider/StoreProvider';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, getItemId } from '../../redux/activeCard/selectorsActiveCard';
import { setCategory } from '../../redux/activeCard/sliceActiveCard';
import { findIncome } from '../../redux/dataLists/selectorsDataLists';

const { incomeSets, currencySets } = selectOptions;

const CardIncome = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation();
  const id = useSelector(getItemId);
  const cardId = useSelector(getCategory);
  // const cardId = 'income';
  const cardData = useSelector(findIncome);
  const [date, setDate] = useState(cardData ? cardData.date : moment(Date.now()).format('YYYY-MM-DD'));
  const [time, setTime] = useState(cardData ? cardData.time : moment(Date.now()).format('HH:mm'));
  const [income, setIncome] = useState(cardData ? cardData.income : incomeSets.options[0].value);
  const [total, setTotal] = useState(cardData ? cardData.total : '');
  const [currency, setCurrency] = useState(cardData ? cardData.currency : currencySets.options[0].value);
  const { onHandleSubmit } = useStore();
  const onHandleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'date':
        return setDate(value);
      case 'time':
        return setTime(value);
      case 'total':
        return setTotal(value);
      case 'income':
        return setIncome(value);
      case 'currency':
        return setCurrency(value);
      default:
        return;
    }
  };
  const onFormSubmit = e => {
    e.preventDefault();
    const data = { date, time, income, total, currency };
    onHandleSubmit({ key: cardId, data, id: id ? id : null });
    id ? history.push({ pathname: state.from, state: state.data }) : history.push('/');
  };
  useEffect(() => {
    dispatch(setCategory('income'));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Form onHandleSubmit={onFormSubmit}>
        <CardTitle title="Доходы" />
        <Input title="День" onChange={onHandleChange} type="date" value={date} name="date" />
        <Input title="Время" onChange={onHandleChange} type="time" value={time} name="time" />
        <Select value={income} onChange={onHandleChange} sets={incomeSets} />
        <Input title="Сумма" onChange={onHandleChange} type="text" value={total} placeholder="Введите сумму" name="total" />
        <Select onChange={onHandleChange} sets={currencySets} />
      </Form>
    </div>
  );
};
export default CardIncome;
