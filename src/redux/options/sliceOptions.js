import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  incomeOpts: [],
  spendingOpts: [],
};

const sliceOptions = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setIncomeOpts: (state, { payload }) => {
      state.incomeOpts = [...payload];
    },
    setSpendingOpts: (state, { payload }) => {
      state.spendingOpts = [...payload];
    },
  },
});

export default sliceOptions.reducer;
export const { setIncomeOpts, setSpendingOpts } = sliceOptions.actions;
