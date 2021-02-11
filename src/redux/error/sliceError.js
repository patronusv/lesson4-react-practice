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
    incomeOptsError: (_, { payload }) => payload,
    spendingOptsError: (_, { payload }) => payload,
    postIncomeOptsError: (_, { payload }) => payload,
    postSpendingOptsError: (_, { payload }) => payload,
    patchIncomeOptsError: (_, { payload }) => payload,
    patchSpendingOptsError: (_, { payload }) => payload,
    deleteIncomeOptsError: (_, { payload }) => payload,
    deleteSpendingOptsError: (_, { payload }) => payload,
    deleteIncomeError: (_, { payload }) => payload,
    deleteSpendingError: (_, { payload }) => payload,
  },
});

const reducerError = sliceError.reducer;
export default reducerError;

export const {
  incomeError,
  spendingError,
  postIncomeError,
  postSpendingError,
  patchIncomeError,
  patchSpendingError,
  incomeOptsError,
  spendingOptsError,
  postIncomeOptsError,
  postSpendingOptsError,
  patchIncomeOptsError,
  patchSpendingOptsError,
  deleteIncomeOptsError,
  deleteSpendingOptsError,
  deleteIncomeError,
  deleteSpendingError,
} = sliceError.actions;
