import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import moment from 'moment';
import Button from '../../components/shared/button/Button';
import Section from '../../components/shared/section/Section';
import { Select } from '../../components/shared/select/Select';
import selectOptions from '../../utils/selectOptions';
import { Input } from '../../components/shared/input/Input';
import { calculatePeriod, categoryResult } from '../../utils/helpers';
import { useStore } from '../../components/storeProvider/StoreProvider';
import DataListItem from '../../components/dataListIem/DataListItem';

const { spendingList } = selectOptions;

const DataList = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { spendData, incomeData } = useStore();
  const [period, setPeriod] = useState('');
  const [select, setSelect] = useState('month');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const onHandleDate = e => {
    setDate(e.target.value);
  };
  const goBack = () => history.push('/');
  const { category } = match.params;
  const categoriesList =
    category === 'income' ? categoryResult(incomeData, category) : category === 'outlay' ? categoryResult(spendData, category) : null;
  const onHandleSelect = e => {
    const result = e.target.value;
    setSelect(result);
  };

  useEffect(() => {
    calculatePeriod(date, select, setPeriod);
  }, [select, date]);
  return (
    <Section>
      <header>
        <Button title="Go back" onClick={goBack} />
        <Select value={select} sets={spendingList} onChange={onHandleSelect} />
      </header>
      <Button title="Left" />
      <Input type="date" name="date" value={date} onChange={onHandleDate} />
      {period && <h2>{period}</h2>}
      <Button title="Right" />
      <h2>Всего: 0.00</h2>
      <ul>
        {categoriesList.map(item => (
          <DataListItem key={item.category} item={item} />
        ))}
      </ul>
    </Section>
  );
};

export default DataList;
