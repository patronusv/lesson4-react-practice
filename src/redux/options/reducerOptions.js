import { combineReducers } from 'redux';
import { ActionTypes } from './actionOptions';
const reducerIncomeOpts = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_INCOME_OPTS:
      return [...payload];

    default:
      return state;
  }
};
const reducerSpendingOpts = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_SPENDING_OPTS:
      return [...payload];

    default:
      return state;
  }
};

export const reducerOptions = combineReducers({
  incomeOpts: reducerIncomeOpts,
  spendingOpts: reducerSpendingOpts,
});
