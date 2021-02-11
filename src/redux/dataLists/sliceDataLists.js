import { combineReducers, createSlice } from '@reduxjs/toolkit';

const sliceIncomeData = createSlice({
  name: 'incomeData',
  initialState: [],
  reducers: {
    getIncomeData: (state, { payload }) => (!payload ? state : payload),
    postIncome: (state, { payload }) => [...state, payload],
    updateIncome: (state, { payload }) => [...state].map(item => (item.id === payload.id ? { ...payload } : item)),
    deleteIncome: (state, { payload }) => [...state].filter(item => item.id !== payload),
  },
});
const sliceSpendingData = createSlice({
  name: 'spendingData',
  initialState: [],
  reducers: {
    getSpendingData: (state, { payload }) => (!payload ? state : payload),
    postSpending: (state, { payload }) => [...state, payload],
    updateSpending: (state, { payload }) => [...state].map(item => (item.id === payload.id ? { ...payload } : item)),
    deleteSpending: (state, { payload }) => [...state].filter(item => item.id !== payload),
  },
});

const dataReducer = combineReducers({
  income: sliceIncomeData.reducer,
  spending: sliceSpendingData.reducer,
});
export default dataReducer;
export const { getIncomeData, postIncome, updateIncome, deleteIncome } = sliceIncomeData.actions;
export const { getSpendingData, postSpending, updateSpending, deleteSpending } = sliceSpendingData.actions;
