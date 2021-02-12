import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { searchCategoryName } from '../../utils/helpers';
// import selectOptions from '../../utils/selectOptions';
import Button from '../shared/button/Button';
import Item from '../shared/item/Item';
import { getCurrentOptions } from '../../redux/options/selectorOptions';
import { getCategory } from '../../redux/activeCard/selectorsActiveCard';
import GoIn from '../icons/goIn/GoIn';

const DataListItem = ({ item, period }) => {
  const [cat, setCat] = useState('');
  const match = useRouteMatch();
  const history = useHistory();
  const { category, total } = item;
  const selectOptions = useSelector(getCurrentOptions);
  const storeCategory = useSelector(getCategory);
  const onOpenCategory = () => {
    history.push({
      pathname: `${match.url}/${category}`,
      state: {
        category: cat,
        parentCat: match.params.category,
        period,
        from: history.location.pathname,
      },
    });
  };
  const getCategoryItem = () => {
    const result = searchCategoryName(category, selectOptions);
    setCat(result);
  };
  useEffect(() => {
    console.log('selectOptions', selectOptions);
    console.log('storeCategory', storeCategory);
    selectOptions.length > 0 && getCategoryItem();

    // eslint-disable-next-line
  }, [selectOptions]);
  return (
    <Item className="d-flex justify-content-between align-items-center">
      <p className="d-flex align-items-center my-0 fs-4 fw-bold">
        <span className="me-2">{cat}:</span> <span>{total}</span>
      </p>
      <Button component={GoIn} onClick={onOpenCategory} className="btn-outline-info" />
    </Item>
  );
};

export default DataListItem;
