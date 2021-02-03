import { useHistory } from 'react-router-dom';
import Button from '../../components/shared/button/Button';
import CardTitle from '../../components/shared/cardTitle/CardTitle';
import Item from '../../components/shared/item/Item';
import List from '../../components/shared/list/List';
import Section from '../../components/shared/section/Section';

const options = [
  {
    value: 'food',
    title: 'Еда',
  },
  {
    value: 'beverages',
    title: 'Напитки',
  },
  {
    value: 'clothes',
    title: 'Одежда',
  },
];

const SelectCategory = () => {
  const history = useHistory();
  return (
    <Section>
      <CardTitle title="Категория" mustSubmit={false} history={history} />
      <List>
        {options.map(item => (
          <Item key={item.value}>
            <Button title={item.title} />
            <Button title={'...'} />
          </Item>
        ))}
      </List>
    </Section>
  );
};

export default SelectCategory;
