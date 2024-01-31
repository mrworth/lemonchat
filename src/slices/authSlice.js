import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    userName: null,
    token: null // Adding token to the state
  },
  reducers: {
    signIn: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      state.token = token;
    },
    signOut: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null; // Resetting the token on sign out
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export const selectUser = state => state.auth.user;
export const selectIsAuthenticated = state => state.auth.isAuthenticated;
export const selectUserName = state => state.auth.userName;
export const selectToken = state => state.auth.token; // Selector for the token

export default authSlice.reducer;
