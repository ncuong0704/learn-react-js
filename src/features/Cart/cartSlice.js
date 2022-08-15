import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartList: [],
  },
  reducers: {
    addCart(state, action) {
      // newItem = {id, product, quantity}
      const newItem = action.payload;
      const index = state.cartList.findIndex((x) => x.id === newItem.id);
      if (index >= 0) {
        state.cartList[index].quantity += newItem.quantity;
      } else {
        state.cartList.push(newItem);
      }
    },
    removeItem(state, action){
      state.cartList = [...state.cartList].filter(item => item.id !== action.payload)
    },
    setQuantity(state, action){
      const newQuantity = action.payload
      const index = state.cartList.findIndex((x) => x.id === newQuantity.id);
      state.cartList[index].quantity = newQuantity.quantity;
    }
  },
});

const { actions, reducer } = cartSlice;
export const { addCart, removeItem, setQuantity } = actions;
export default reducer;
