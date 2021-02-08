import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  incomeOpts: [],
  spendingOpts: [],
  isNull: {
    income: false,
    spending: false,
  },
};

const sliceOptions = createSlice({
  name: 'options',
  initialState,
  reducers: {
    getInitIncomeOpts: (state, { payload }) => {
      state.incomeOpts = [...payload];
    },
    getInitSpendingOpts: (state, { payload }) => {
      state.spendingOpts = [...payload];
    },
    postIncomeOpt: (state, { payload }) => {
      state.incomeOpts = payload ? [...state.incomeOpts, payload] : [...state.incomeOpts];
    },
    postSpendingOpt: (state, { payload }) => {
      state.spendingOpts = payload ? [...state.spendingOpts, payload] : [...state.spendingOpts];
    },
    patchIncomeOpt: (state, { payload }) => {
      state.incomeOpts = [...state.incomeOpts].map(item => (item.id === payload.id ? { ...payload } : item));
    },
    patchSpendingOpt: (state, { payload }) => {
      state.spendingOpts = [...state.spendingOpts].map(item => (item.id === payload.id ? { ...payload } : item));
    },
    onNullOptions: (state, { payload }) => {
      state.isNull[payload] = true;
    },
    offNullOptions: (state, { payload }) => {
      state.isNull[payload] = false;
    },
  },
});

export default sliceOptions.reducer;
export const {
  postIncomeOpt,
  postSpendingOpt,
  getInitSpendingOpts,
  getInitIncomeOpts,
  patchIncomeOpt,
  patchSpendingOpt,
  onNullOptions,
  offNullOptions,
} = sliceOptions.actions;
