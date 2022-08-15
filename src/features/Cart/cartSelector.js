import { createSelector } from "@reduxjs/toolkit";

const cartItemsSelector = (state) => state.cart.cartList;

// count number of products in cart
export const cartItensCountSelector = createSelector(cartItemsSelector, (cartList) =>
  cartList.reduce((count, item) => count + item.quantity, 0)
);

// count number of products in cart
export const cartTotalSelector = createSelector(cartItemsSelector, (cartList) =>
  cartList.reduce((total, item) => total + item.quantity * item.product.salePrice, 0)
);
