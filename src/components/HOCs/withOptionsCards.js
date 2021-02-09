import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { setCategory } from '../../redux/activeCard/sliceActiveCard';
import { operationGetOptions, operationPostOptions } from '../../redux/options/operationOptions';
import { getIncomeOpts, getSpendingOpts, getCurrentOptions, getCurrentOptionsNull } from '../../redux/options/selectorOptions';
import { offNullOptions, postIncomeOpt, postSpendingOpt } from '../../redux/options/sliceOptions';
import selectOptions from '../../utils/selectOptions';

const withOptionsCards = WrappedComponent => {
  return function WithOptionsCards(props) {
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const category = match.path.split('/')[1];
    const isNullOptions = useSelector(getCurrentOptionsNull);
    const { outlaySets, incomeSets } = selectOptions;
    const dataSets = category === 'spending' ? outlaySets : incomeSets;

    console.log('match', match);
    const options = useSelector(getCurrentOptions);

    useEffect(() => {
      dispatch(setCategory(category));
    }, []);
    useEffect(() => {
      if (!options.length) {
        dispatch(operationGetOptions(category));
      }
    }, [options.length]);
    const postBaseOptions = () => {
      isNullOptions &&
        [...dataSets.options].forEach(async (item, idx, array) => {
          await dispatch(operationPostOptions(category, item));
          idx === array.length - 1 && dispatch(offNullOptions(category));
        });
      // isNullOptions && dispatch(offNullOptions(category));
    };
    useEffect(() => {
      postBaseOptions();
    }, [isNullOptions]);
    return <WrappedComponent {...props} a={5} />;
  };
};

export default withOptionsCards;
