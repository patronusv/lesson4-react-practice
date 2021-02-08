import { combineReducers, createSlice } from '@reduxjs/toolkit';

const sliceIncomeData = createSlice({
  name: 'incomeData',
  initialState: [],
  reducers: {
    getIncomeData: (state, { payload }) => (!payload ? state : payload),
    postIncome: (state, { payload }) => [...state, payload],
    updateIncome: (state, { payload }) => [...state].map(item => (item.id === payload.id ? { ...payload } : item)),
  },
});
const sliceSpendingData = createSlice({
  name: 'spendingData',
  initialState: [],
  reducers: {
    getSpendingData: (state, { payload }) => (!payload ? state : payload),
    postSpending: (state, { payload }) => [...state, payload],
    updateSpending: (state, { payload }) => {
      console.log('payload patch object', payload);
      return [...state].map(item => (item.id === payload.id ? { ...payload } : item));
    },
  },
});

const dataReducer = combineReducers({
  income: sliceIncomeData.reducer,
  spending: sliceSpendingData.reducer,
});
export default dataReducer;
export const { getIncomeData, postIncome, updateIncome } = sliceIncomeData.actions;
export const { getSpendingData, postSpending, updateSpending } = sliceSpendingData.actions;
