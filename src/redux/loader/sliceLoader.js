import { createSlice } from '@reduxjs/toolkit';

const sliceLoader = createSlice({
  name: 'loader',
  initialState: false,
  reducers: {
    incomeList: () => true,
    spendingList: () => true,
    requestIncome: () => true,
    requestSpending: () => true,
    requestPatchIncome: () => true,
    requestPatchSpending: () => true,
    requestIncomeOpts: () => true,
    requestSpendingOpts: () => true,
    requestPostIncomeOpts: () => true,
    requestPostSpendingOpts: () => true,
    requestPatchIncomeOpts: () => true,
    requestPatchSpendingOpts: () => true,
    loaderOff: () => false,
  },
});
const reducerLoader = sliceLoader.reducer;
export default reducerLoader;

export const {
  incomeList,
  spendingList,
  requestIncome,
  requestSpending,
  requestPatchIncome,
  requestPatchSpending,
  loaderOff,
  requestIncomeOpts,
  requestSpendingOpts,
  requestPostIncomeOpts,
  requestPostSpendingOpts,
  requestPatchIncomeOpts,
  requestPatchSpendingOpts,
} = sliceLoader.actions;
