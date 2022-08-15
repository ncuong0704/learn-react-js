import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import StorageKeys from "constants/storage-keys";
export const register = createAsyncThunk("user/register", async (payload) => {
  // call api to register
  const data = await userApi.register(payload);

  // return user data
  return data.user;
});
export const login = createAsyncThunk("user/login", async (payload) => {
  // call api to login
  const data = await userApi.login(payload);
  // save date to local storrage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  return data.user;
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logOut() {
      localStorage.removeItem(StorageKeys.TOKEN)
      localStorage.removeItem(StorageKeys.USER)
      return {
        current: {},
        settings: {},
      };
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;

export const {logOut} = actions;
export default reducer;
