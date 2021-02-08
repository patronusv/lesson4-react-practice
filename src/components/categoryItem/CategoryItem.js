import Button from '../shared/button/Button';
import { useDispatch } from 'react-redux';
import { setItemId } from '../../redux/activeCard/sliceActiveCard';

const CategoryItem = ({ item, goToEdit }) => {
  const dispatch = useDispatch();
  const { id, date, total, currency } = item;
  const onEditClick = () => {
    goToEdit(id);
    dispatch(setItemId(id));
  };
  return (
    <li>
      <span>{date}</span>
      <span>Comment</span>
      <span>{`${total} ${currency}`}</span>
      <Button title="Edit" onClick={onEditClick} />
    </li>
  );
};

export default CategoryItem;
