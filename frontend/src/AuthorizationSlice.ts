import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
  username: string; 
  email: string;
}

interface AuthorizationState {
  isAuthenticated: boolean;
  user: User | null;
}
const initialState: AuthorizationState = {
  isAuthenticated: false,
  user: null,
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authorizationSlice.actions;
export default authorizationSlice.reducer;

