import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartList: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartList.push(action.payload)
    },
    removeFromCart: (state, action) => {
      const index = state.cartList.findIndex((item) => item.id === action.payload)
      if (index !== -1) state.cartList.splice(index, 1)
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer
