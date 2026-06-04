import { createSlice } from '@reduxjs/toolkit';

import { loadOrdersFromStorage } from './ordersStorage';

const initialState = loadOrdersFromStorage();

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
      state.nextOrderNumber = action.payload.orderNumber + 1;
    },
  },
});

export const { addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
