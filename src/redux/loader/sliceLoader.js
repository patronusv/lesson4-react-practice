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
    loaderOff: () => false,
  },
});
const reducerLoader = sliceLoader.reducer;
export default reducerLoader;

export const { incomeList, spendingList, requestIncome, requestSpending, requestPatchIncome, requestPatchSpending, loaderOff } = sliceLoader.actions;
