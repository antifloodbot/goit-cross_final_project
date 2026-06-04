import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cartSlice';
import { saveCartToStorage } from './cartStorage';
import ordersReducer from './ordersSlice';
import { saveOrdersToStorage } from './ordersStorage';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  saveCartToStorage(state.cart);
  saveOrdersToStorage(state.orders);
});
