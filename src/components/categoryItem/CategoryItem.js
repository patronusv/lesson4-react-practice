import Button from '../shared/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setItemId } from '../../redux/activeCard/sliceActiveCard';
import { getCategory } from '../../redux/activeCard/selectorsActiveCard';
import { operationDeleteIncome, operationDeleteSpending } from '../../redux/dataLists/operationDataLists';
import Item from '../shared/item/Item';
import Edit from '../icons/edit/Edit';

import Flex from '../flex/Flex';
import Delete from '../icons/delete/Delete';

const CategoryItem = ({ item, goToEdit }) => {
  const dispatch = useDispatch();
  const { id, date, total, currency, comment } = item;
  const category = useSelector(getCategory);
  const onEditClick = () => {
    goToEdit(id);
    dispatch(setItemId(id));
  };
  const onDeleteClick = () => {
    category === 'spending' ? dispatch(operationDeleteSpending(category, id)) : dispatch(operationDeleteIncome(category, id));
  };

  return (
    <Item className="d-flex justify-content-between align-items-stretch">
      <Flex className="flex-column justify-content-start">
        <Flex className="fs-5">
          <span style={{ lineHeight: '1.2' }}>{date}</span>
          <span style={{ lineHeight: '1.2' }} className="mx-2">
            |
          </span>
          <span style={{ lineHeight: '1.2' }}>{`${total} ${currency}`}</span>
        </Flex>
        {/* <span className="d-block fs-6">comment</span> */}
        {comment && <span className="d-block fs-6">{comment}</span>}
      </Flex>
      <Flex>
        <Button component={Edit} onClick={onEditClick} className="btn-outline-info me-2" />
        <Button component={Delete} onClick={onDeleteClick} className="btn-outline-danger" />
      </Flex>
    </Item>
  );
};

export default CategoryItem;
