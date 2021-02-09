import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import shortid from 'shortid';
import Button from '../../components/shared/button/Button';
import CardTitle from '../../components/shared/cardTitle/CardTitle';
import Item from '../../components/shared/item/Item';
import List from '../../components/shared/list/List';
import Section from '../../components/shared/section/Section';
import { setCard } from '../../redux/activeCard/sliceActiveCard';
import { getCurrentOptions } from '../../redux/options/selectorOptions';
import { Input } from '../../components/shared/input/Input';
import { Form } from '../../components/shared/form/Form';
import { Select } from '../../components/shared/select/Select';
import { operationDeleteOptions, operationPostOptions } from '../../redux/options/operationOptions';
import { getCategory } from '../../redux/activeCard/selectorsActiveCard';
import selectOptions from '../../utils/selectOptions';
import { getOptionId } from '../../utils/helpers';
const { remEditBtns } = selectOptions;

const SelectCategory = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation();
  const match = useRouteMatch();
  const [newCategory, setNewCategory] = useState('');
  const [selectName, setSelectName] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const postCategory = useSelector(getCategory);
  const category = match.url.split('/')[1] === 'spending' ? 'outlay' : 'income';
  const options = useSelector(getCurrentOptions);
  const onSelectCategory = e => {
    dispatch(setCard({ [category]: e.target.value }));
    state?.from ? history.push(state.from) : history.push('/');
  };
  const onHandleChange = e => {
    setNewCategory(e.target.value);
  };
  const onHandleSubmit = e => {
    e.preventDefault();
    const data = {
      title: newCategory,
      value: shortid.generate(),
    };
    dispatch(operationPostOptions(postCategory, data));
    setNewCategory('');
  };
  const onHandleSelect = e => {
    const { name, value } = e.target;
    setSelectName(name);
    setSelectValue(value);
  };
  useEffect(() => {
    const id = getOptionId(selectName, options);
    console.log('selectName', selectName);
    console.log('options', options);
    console.log('id', id);
    selectValue && dispatch(operationDeleteOptions(postCategory, id));
  }, [selectValue]);

  return (
    <Section>
      <CardTitle title="Категория" mustSubmit={false} history={history} />
      <List>
        {options.map(item => (
          <Item key={item.value}>
            <Button title={item.title} name={category} value={item.value} onClick={onSelectCategory} />
            <Select
              sets={{ ...remEditBtns, name: item.value }}
              onChange={onHandleSelect}
              value={selectName === item.value ? selectValue : remEditBtns.options[0].title}
            />
            {/* <Button title={'...'} /> */}
          </Item>
        ))}
      </List>
      <Form onHandleSubmit={onHandleSubmit}>
        <Input title="Введите название категории" onChange={onHandleChange} value={newCategory} name={category} />
        <Button title="Добавить" type="submit" />
      </Form>
    </Section>
  );
};

export default SelectCategory;
