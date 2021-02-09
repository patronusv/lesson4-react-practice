import { getItemId } from '../activeCard/selectorsActiveCard';

export const getIncome = state => state.data.income;
export const getSpending = state => state.data.spending;
export const findIncome = state => {
  const id = getItemId(state);
  if (id === '') return null;
  return getIncome(state).find(el => el.id === id);
};
export const findSpending = state => {
  const id = getItemId(state);
  if (id === '') return null;
  return getSpending(state).find(el => el.id === id);
};
