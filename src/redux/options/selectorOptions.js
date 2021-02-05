import { getCategory } from '../activeCard/selectorsActiveCard';
export const getIncomeOpts = state => state.options.incomeOpts;
export const getSpendingOpts = state => state.options.spendingOpts;
const isNullIncomeOpts = state => state.options.isNull.income;
const isNullSpendingOpts = state => state.options.isNull.spending;

export const getCurrentOptions = state => {
  const category = getCategory(state);
  return category === 'spending' ? getSpendingOpts(state) : getIncomeOpts(state);
};
export const getCurrentOptionsNull = state => {
  const category = getCategory(state);
  return category === 'spending' ? isNullSpendingOpts(state) : isNullIncomeOpts(state);
};
