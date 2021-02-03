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
import { getCategory, getItemId } from '../../redux/activeCard/selectorsActiveCard';
import { resetItemId, setCategory } from '../../redux/activeCard/actionActiveCard';
import { findSpending } from '../../redux/dataLists/selectorsDataLists';
import { getSpendingOpts } from '../../redux/options/selectorOptions';
import ApiServicesClass from '../../services/apiServicesClass';
import { setSpendingOpts } from '../../redux/options/actionOptions';

const { outlaySets, currencySets } = selectOptions;

const api = new ApiServicesClass();

const CardSpendings = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation();
  const { params } = useRouteMatch();
  const id = useSelector(getItemId);
  const spendingOpts = useSelector(getSpendingOpts);

  console.log('spendingOpts', spendingOpts);
  const { onHandleSubmit, getCardData } = useStore();
  const cardId = useSelector(getCategory);
  // const cardId = 'spending';
  console.log(id);
  const cardData = useSelector(findSpending);
  console.log('cardData', getCardData({ category: cardId }));
  const [date, setDate] = useState(cardData ? cardData.date : moment(Date.now()).format('YYYY-MM-DD'));
  const [time, setTime] = useState(cardData ? cardData.time : moment(Date.now()).format('HH:mm'));
  // const [outlay, setOutlay] = useState('clothes');
  const [outlay, setOutlay] = useState(cardData ? cardData.outlay : outlaySets.options[0].value);
  const [total, setTotal] = useState(cardData ? cardData.total : '');
  const [currency, setCurrency] = useState(cardData ? cardData.currency : currencySets.options[0].value);
  const onHandleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'date':
        return setDate(value);
      case 'time':
        return setTime(value);
      case 'total':
        return setTotal(value);
      case 'outlay':
        return setOutlay(value);
      case 'currency':
        return setCurrency(value);
      default:
        return;
    }
  };
  const onFormSubmit = e => {
    e.preventDefault();
    const data = { date, time, outlay, total, currency };
    onHandleSubmit({ key: cardId, data, id: id ? id : null });
    id ? history.push({ pathname: state.from, state: state.data }) : history.push('/');
  };

  useEffect(() => {
    dispatch(setCategory('spending'));
    api
      .getSpendingOpts()
      .then(data =>
        data.length
          ? dispatch(setSpendingOpts(data))
          : outlaySets.options.map(item => api.postOpts('spending', item).then(response => dispatch(setSpendingOpts(response)))),
      );
    // eslint-disable-next-line
  }, []);
  // useEffect(() => {}, [id]);

  return (
    <div>
      <Form onHandleSubmit={onFormSubmit}>
        <CardTitle title="Расходы" />
        <Input title="День" onChange={onHandleChange} type="date" value={date} name="date" />
        <Input title="Время" onChange={onHandleChange} type="time" value={time} name="time" />
        <Select value={outlay} onChange={onHandleChange} sets={outlaySets} />
        <Input title="Сумма" onChange={onHandleChange} type="text" value={total} placeholder="Введите сумму" name="total" />
        <Select onChange={onHandleChange} sets={currencySets} />
      </Form>
    </div>
  );
};
export default CardSpendings;
