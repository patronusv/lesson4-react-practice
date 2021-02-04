import { createSlice } from '@reduxjs/toolkit';

const sliceError = createSlice({
  name: 'error',
  initialState: null,
  reducers: {
    incomeError: (_, { payload }) => payload,
    spendingError: (_, { payload }) => payload,
    postIncomeError: (_, { payload }) => payload,
    postSpendingError: (_, { payload }) => payload,
    patchIncomeError: (_, { payload }) => payload,
    patchSpendingError: (_, { payload }) => payload,
  },
});

const reducerError = sliceError.reducer;
export default reducerError;

export const { incomeError, spendingError, postIncomeError, postSpendingError, patchIncomeError, patchSpendingError } = sliceError.actions;
