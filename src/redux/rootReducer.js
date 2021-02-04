import { combineReducers } from 'redux';
import dataReducer from './dataLists/sliceDataLists';
import reducerCard from './activeCard/sliceActiveCard';
import reducerSets from './sets/sliceSets';
import reducerOptions from './options/sliceOptions';
import reducerLoader from './loader/sliceLoader';
import reducerError from './error/sliceError';

const rootReducer = combineReducers({
  data: dataReducer,
  card: reducerCard,
  sets: reducerSets,
  options: reducerOptions,
  isLoading: reducerLoader,
  error: reducerError,
});

export default rootReducer;
