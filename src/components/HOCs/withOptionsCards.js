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
    const foo = useSelector(state => state.options);
    useEffect(() => {
      dispatch(setCategory(category));
      console.log('options.length', options.length);
      console.log('foo', foo);
      if (!options.length) {
        console.log('dispatching categories');
        dispatch(operationGetOptions(category));
      }
    }, []);
    const postBaseOptions = () => {
      console.log('dataSets.options', dataSets.options);
      isNullOptions && dataSets.options.map(item => dispatch(operationPostOptions(category, item)));
      isNullOptions && dispatch(offNullOptions(category));
    };
    useEffect(() => {
      postBaseOptions();
    }, [isNullOptions]);
    return <WrappedComponent {...props} a={5} />;
  };
};

export default withOptionsCards;
