import moment from 'moment';
import { createSlice } from '@reduxjs/toolkit';
import selectOptions from '../../utils/selectOptions';

const initialState = {
  date: moment().format('YYYY-MM-DD'),
  period: selectOptions.periodList.options[0].value,
};

const sliceSets = createSlice({
  name: 'sliceSets',
  initialState,
  reducers: {
    setDate(state, { payload }) {
      return {
        ...state,
        date: payload,
      };
    },
    setPeriod(state, { payload }) {
      return {
        ...state,
        period: payload,
      };
    },
    reset() {
      return { ...initialState };
    },
  },
});

const reducerSets = sliceSets.reducer;
export default reducerSets;
export const { setDate, setPeriod, reset } = sliceSets.actions;
