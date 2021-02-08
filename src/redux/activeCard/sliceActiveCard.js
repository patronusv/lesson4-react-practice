import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  id: '',
  category: '',
  data: {
    date: '',
    time: '',
    outlay: '',
    income: '',
    currency: '',
    total: '',
  },
};

const sliceActiveCard = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    setItemId: (state, { payload }) => ({ ...state, id: payload }),
    resetItemId: state => ({ ...state, id: '' }),
    setCategory: (state, { payload }) => ({ ...state, category: payload }),
    setInitialCard: (state, { payload }) => ({ ...state, data: { ...payload } }),
    setCard: (state, { payload }) => ({ ...state, data: { ...state.data, ...payload } }),
    resetCard: state => ({ ...state, data: { ...initialState.data } }),
  },
});

const reducerCard = sliceActiveCard.reducer;
export default reducerCard;

export const { setItemId, resetItemId, setCategory, setInitialCard, setCard, resetCard } = sliceActiveCard.actions;
