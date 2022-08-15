import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: "count",
  initialState: 0,
  reducers: {
    Increase(state, action) {
      return state + 1;
    },
    Decrease(state, action) {
      return state - 1;
    },
  },
});

const { reducer, actions } = countSlice;

export const { Increase, Decrease } = actions;

export default reducer;
