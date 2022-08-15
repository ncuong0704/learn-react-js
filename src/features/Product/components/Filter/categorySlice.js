import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    getAll(state, action) {
      return action.payload;
    },
  },
});

const { actions, reducer } = categorySlice;
export const { getAll } = actions;
export default reducer;
