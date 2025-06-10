import React, { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login as loginAction, logout as logoutAction } from "../AuthorizationSlice";
import type { RootState } from "../store";

interface AuthorizationContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: { username: string } | null;
  login: (token: string, user: { username: string }) => void;
  logout: () => void;
}


export const AuthorizationContext = createContext<AuthorizationContextType | undefined>(undefined);

export const AuthorizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, token, user } = useSelector((state: RootState) => state.authorization);

  const login = (token: string, user: { username: string }) => {
    localStorage.setItem("token", token);
    dispatch(loginAction({ token, user }));
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(logoutAction());
  };

  const value: AuthorizationContextType = {
    isAuthenticated,
    token,
    user,
    login,
    logout,
  };

  return <AuthorizationContext.Provider value={value}>{children}</AuthorizationContext.Provider>;
};

export const useAuthorization = (): AuthorizationContextType => {
  const context = useContext(AuthorizationContext);
  if (!context) {
    throw new Error("useAuthorization must be used within an AuthorizationProvider");
  }
  return context;
};