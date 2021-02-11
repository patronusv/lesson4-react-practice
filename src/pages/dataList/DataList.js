import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/shared/button/Button';
import Section from '../../components/shared/section/Section';
import { Select } from '../../components/shared/select/Select';
import selectOptions from '../../utils/selectOptions';
import { Input } from '../../components/shared/input/Input';
import { calculatePeriod, categoryResult, getDataByCategory, getDataByPeriodDate } from '../../utils/helpers';

import DataListItem from '../../components/dataListIem/DataListItem';
import { getIncome, getSpending } from '../../redux/dataLists/selectorsDataLists';
import { getDate, getPeriod } from '../../redux/sets/selectorSets';
import { setDate, setPeriod } from '../../redux/sets/sliceSets';
import { setCategory } from '../../redux/activeCard/sliceActiveCard';
import withOptionsCards from '../../components/HOCs/withOptionsCards';
import CountTotal from '../../utils/countTotal';
import Container from '../../components/shared/container/Container';

const { periodList } = selectOptions;

const { incrementDate, decrementDate } = new CountTotal();

const DataList = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const incomeData = useSelector(getIncome);
  const spendData = useSelector(getSpending);
  const date = useSelector(getDate);
  const period = useSelector(getPeriod);

  const [periodStr, setPeriodStr] = useState('');
  const [renderList, setRenderList] = useState([]);

  const onHandleDate = e => {
    dispatch(setDate(e.target.value));
  };
  const goBack = () => history.push('/');
  const { category } = match.params;

  const onHandlePeriod = e => {
    const result = e.target.value;
    dispatch(setPeriod(result));
  };
  const onIncrement = () => {
    dispatch(setDate(incrementDate(date, period)));
  };
  const onDecrement = () => {
    dispatch(setDate(decrementDate(date, period)));
  };

  useEffect(() => {
    const dataList = getDataByCategory(category, incomeData, spendData);
    calculatePeriod(date, period, setPeriodStr);
    const currentDataList = getDataByPeriodDate(dataList, period, date);
    const renderDataList = categoryResult(currentDataList, category);
    setRenderList(renderDataList);
    console.log('match.path data list', match.path);
    // eslint-disable-next-line
  }, [period, date, incomeData.length, spendData.length]);

  console.log('renderlist', renderList);
  return (
    <Section>
      <Container>
        <header className="d-flex row mb-1">
          <Button title="Go back" onClick={goBack} />
          <Select value={period} sets={periodList} onChange={onHandlePeriod} />
        </header>
        <Button title="Left" onClick={onDecrement} />
        <Input type="date" name="date" value={date} onChange={onHandleDate} />
        {periodStr && <h2>{periodStr}</h2>}
        <Button title="Right" onClick={onIncrement} />
        <h2>Всего: 0.00</h2>
        <ul>
          {renderList.map(item => (
            <DataListItem key={item.category} item={item} period={periodStr} />
          ))}
        </ul>
      </Container>
    </Section>
  );
};

export default withOptionsCards(DataList);
