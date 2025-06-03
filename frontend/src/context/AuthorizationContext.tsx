// context/AuthorizationContext.tsx

import React, { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login as loginAction, logout as logoutAction } from "../AuthorizationSlice";
import type { RootState } from "../store";

interface User {
  username: string;
  email: string;
}

interface AuthorizationContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthorizationContext = createContext<AuthorizationContextType | undefined>(undefined);

export const AuthorizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.authorization);

  const login = (user: User) => dispatch(loginAction(user));
  const logout = () => dispatch(logoutAction());

  const value: AuthorizationContextType = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return (
    <AuthorizationContext.Provider value={value}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export const useAuthorization = (): AuthorizationContextType => {
  const context = useContext(AuthorizationContext);
  if (!context) {
    throw new Error("useAuthorization must be used within an AuthorizationProvider");
  }
  return context;
};
