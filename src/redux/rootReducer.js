import { combineReducers } from 'redux';
import { dataReducer } from './dataLists/reducerDataLists';
import { reducerCard } from './activeCard/reducerActiveCard';
import { reducerSets } from './sets/reducerSets';
import { reducerOptions } from './options/reducerOptions';

const rootReducer = combineReducers({
  data: dataReducer,
  card: reducerCard,
  sets: reducerSets,
  options: reducerOptions,
});

export default rootReducer;
