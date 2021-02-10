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
import { operationDeleteOptions, operationPatchOptions, operationPostOptions } from '../../redux/options/operationOptions';
import { getCategory } from '../../redux/activeCard/selectorsActiveCard';
import selectOptions from '../../utils/selectOptions';
import { getOptionId } from '../../utils/helpers';
const { remEditBtns } = selectOptions;

const initialCategoryState = {
  title: '',
  value: '',
};

const SelectCategory = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation();
  const match = useRouteMatch();
  const [newCategory, setNewCategory] = useState(initialCategoryState);
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
    setNewCategory(prev => ({ ...prev, title: e.target.value }));
  };
  const onHandleSubmit = e => {
    e.preventDefault();
    if (selectValue === 'edit') {
      const { title, value, id } = newCategory;
      dispatch(operationPatchOptions(postCategory, { title, value }, id));
      setSelectName('');
      setSelectValue('');
    } else {
      const data = {
        ...newCategory,
        value: shortid.generate(),
      };
      dispatch(operationPostOptions(postCategory, data));
    }
    setNewCategory(initialCategoryState);
  };
  const onHandleSelect = e => {
    const { name, value } = e.target;
    setSelectName(name);
    setSelectValue(value);
    console.log('selectValue', selectValue);
    value === 'edit' && onOpenEdit(e);
  };
  const onOpenEdit = e => {
    const editData = options.find(el => el.value === e.target.name);
    setNewCategory(editData);
  };
  const onCancelEdit = () => {
    setSelectName('');
    setSelectValue('');
    setNewCategory(initialCategoryState);
  };
  useEffect(() => {
    const id = getOptionId(selectName, options);
    console.log('selectName', selectName);
    console.log('selectValue', selectValue);
    console.log('options', options);
    console.log('id', id);
    selectValue === 'remove' && dispatch(operationDeleteOptions(postCategory, id));
    // selectValue === 'edit' && onOpenEdit();
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
        <Input title="Введите название категории" onChange={onHandleChange} value={newCategory.title} name={category} />
        <Button title={selectValue === 'edit' ? 'Редактировать' : 'Добавить'} type="submit" />
        {selectValue === 'edit' && <Button title="Отменить" onClick={onCancelEdit} />}
      </Form>
    </Section>
  );
};

export default SelectCategory;
