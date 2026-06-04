import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const findCartItemIndex = (cartItems, productId, size) =>
  cartItems.findIndex((item) => item.id === productId && item.size === size);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const quantity = item.quantity ?? 1;
      const existingItemIndex = findCartItemIndex(state, item.id, item.size);

      // Redux cart items are unique by product id and selected size.
      if (existingItemIndex >= 0) {
        state[existingItemIndex].quantity += quantity;
        return;
      }

      state.push({
        ...item,
        quantity,
      });
    },
    removeItem: (state, action) => {
      const { id, size } = action.payload;

      // Removing uses the same id + size key as adding items.
      return state.filter((item) => item.id !== id || item.size !== size);
    },
    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const existingItemIndex = findCartItemIndex(state, id, size);

      if (existingItemIndex === -1) {
        return;
      }

      if (quantity <= 0) {
        return state.filter((item) => item.id !== id || item.size !== size);
      }

      state[existingItemIndex].quantity = quantity;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
