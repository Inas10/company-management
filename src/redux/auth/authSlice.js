import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleLogin } from "../../api/authAPI";

const initialState = {
  account: null,
  token: null,
  authenticated: false,
  loading: false,
};
export const refreshTokenSetup = (res) => async (dispatch) => {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    dispatch(updateToken(newAuthRes));
    setTimeout(refreshToken, refreshTiming);
  };
  setTimeout(refreshToken, refreshTiming);
};

export const loginUser = createAsyncThunk("auth/handleLogin", async (data) => {
  const response = await handleLogin(data);
  return { ...data, account: response.data };
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.account = null;
      state.token = null;
      state.authenticated = false;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.account = action.payload.account;
        state.token = action.payload.tokenObj;
        state.authenticated = true;
        state.loading = false;
      });
  },
});

export const { logout, updateToken } = authSlice.actions;

export const getAuth = (state) => state.auth;

export default authSlice.reducer;
