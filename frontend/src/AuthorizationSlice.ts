import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthorizationState {
  isAuthenticated: boolean;
  token: string | null;
  user: { username: string } | null;
}

const initialState: AuthorizationState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string; user: { username: string } }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authorizationSlice.actions;
export default authorizationSlice.reducer;