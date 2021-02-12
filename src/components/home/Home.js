import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CountTotal from '../../utils/countTotal';
import Button from '../shared/button/Button';
import Section from '../shared/section/Section';
import { getIncome, getSpending } from '../../redux/dataLists/selectorsDataLists';
import { useEffect } from 'react';
import { reset } from '../../redux/sets/sliceSets';
import { setCategory } from '../../redux/activeCard/sliceActiveCard';
import Container from '../shared/container/Container';
import Title from '../shared/title/Title';
import List from '../shared/list/List';
import Item from '../shared/item/Item';
import Flex from '../flex/Flex';
import Add from '../icons/add/Add';

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
      <Container className="mb-5">
        <Flex className="justify-content-between">
          <Title title="Расходы" />
          <Button onClick={goToSpending} component={Add} />
        </Flex>
        <p>RUB</p>
        <List>
          <Item>Сегодня: {countTotal(getDayPeriod(spending))}</Item>
          <Item>Неделя: {countTotal(getWeekPeriod(spending))}</Item>
          <Item>Месяц: {countTotal(getMonthPeriod(spending))}</Item>
        </List>
      </Container>
      <Container className="mb-5">
        <Flex className="justify-content-between">
          <Title title="Доходы" />
          <Button onClick={goToIncome} component={Add} />
        </Flex>
        <p>RUB</p>
        <List>
          <Item>Месяц: {countTotal(getMonthPeriod(income))}</Item>
        </List>
      </Container>
      <Container>
        <Flex className="justify-content-around">
          <Button onClick={goToListIncome} title="Все доходы" className="btn-outline-success col-5" />
          <Button onClick={goToListOutlay} title="Все расходы" className="btn-outline-danger col-5" />
        </Flex>
      </Container>
    </Section>
  );
};

export default Home;
