import { combineReducers, createSlice } from '@reduxjs/toolkit';

const sliceActiveId = createSlice({
  name: 'activeId',
  initialState: '',
  reducers: {
    setItemId: (state, { payload }) => payload,
    resetItemId: () => '',
  },
});

const sliceActiveCategory = createSlice({
  name: 'activeCategory',
  initialState: '',
  reducers: {
    setCategory: (state, { payload }) => payload,
  },
});

const reducerCard = combineReducers({
  id: sliceActiveId.reducer,
  category: sliceActiveCategory.reducer,
});
export default reducerCard;

export const { setItemId, resetItemId } = sliceActiveId.actions;
export const { setCategory } = sliceActiveCategory.actions;
