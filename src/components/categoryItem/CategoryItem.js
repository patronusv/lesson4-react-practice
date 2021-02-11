import Button from '../shared/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setItemId } from '../../redux/activeCard/sliceActiveCard';
import { getCategory } from '../../redux/activeCard/selectorsActiveCard';
import { operationDeleteIncome, operationDeleteSpending } from '../../redux/dataLists/operationDataLists';

const CategoryItem = ({ item, goToEdit }) => {
  const dispatch = useDispatch();
  const { id, date, total, currency } = item;
  const category = useSelector(getCategory);
  const onEditClick = () => {
    goToEdit(id);
    dispatch(setItemId(id));
  };
  const onDeleteClick = () => {
    category === 'spending' ? dispatch(operationDeleteSpending(category, id)) : dispatch(operationDeleteIncome(category, id));
  };

  return (
    <li>
      <span>{date}</span>
      <span>Comment</span>
      <span>{`${total} ${currency}`}</span>
      <Button title="Edit" onClick={onEditClick} />
      <Button title="delete" onClick={onDeleteClick} />
    </li>
  );
};

export default CategoryItem;
