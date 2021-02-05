import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CountTotal from '../../utils/countTotal';
import Button from '../shared/button/Button';
import Section from '../shared/section/Section';
import { getIncome, getSpending } from '../../redux/dataLists/selectorsDataLists';
import { useEffect } from 'react';
import { reset } from '../../redux/sets/sliceSets';
import { setCategory } from '../../redux/activeCard/sliceActiveCard';

const Home = () => {
  const dispatch = useDispatch();
  const income = useSelector(getIncome);
  const spending = useSelector(getSpending);
  const history = useHistory();
  const { getDayPeriod, getWeekPeriod, getMonthPeriod, countTotal } = new CountTotal();
  const goToSpending = () => history.push('/spending');
  const goToIncome = () => history.push('/income');
  const goToListIncome = () => history.push('/list/income');
  const goToListOutlay = () => history.push('/list/outlay');
  useEffect(() => {
    dispatch(reset());
    dispatch(setCategory(''));
    // eslint-disable-next-line
  }, []);

  return (
    <Section>
      <div style={{ width: 'max-content', margin: '0 auto', border: '1px solid navy' }}>
        <h2>Расходы</h2>
        <p>RUB</p>
        <ul>
          <li>Сегодня: {countTotal(getDayPeriod(spending))}</li>
          <li>Неделя: {countTotal(getWeekPeriod(spending))}</li>
          <li>Месяц: {countTotal(getMonthPeriod(spending))}</li>
        </ul>
        <Button onClick={goToSpending} title="+" />
      </div>
      <div style={{ width: 'max-content', margin: '0 auto', border: '1px solid navy' }}>
        <h2>Доходы</h2>
        <p>RUB</p>
        <ul>
          <li>Месяц: {countTotal(getMonthPeriod(income))}</li>
        </ul>
        <Button onClick={goToIncome} title="+" />
      </div>
      <div style={{ width: 'max-content', margin: '0 auto', border: '1px solid navy' }}>
        <Button onClick={goToListIncome} title="Все доходы" />
        <Button onClick={goToListOutlay} title="Все расходы" />
      </div>
    </Section>
  );
};

export default Home;
