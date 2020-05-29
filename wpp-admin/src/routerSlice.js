import { createSlice } from '@reduxjs/toolkit';
import { routes } from './consts';

export const routerSlice = createSlice({
  name: 'router',
  initialState: {
    page: routes.product_boxes,
  },
  reducers: {
    goTo: (state, action) => {
      state.page = action.payload.page;
    },
  },
});

export const { goTo } = routerSlice.actions;

export const selectCurrentPage = (state) => state.router.page;
export const selectCurrentItem = (state) => state.router.item;

export default routerSlice.reducer;
