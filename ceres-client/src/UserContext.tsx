import React, { useState, useEffect, createContext } from 'react';
import AuthService from './services/authService';

export type AuthUser = {
  id: number;
  username: string;
  departmentId: number;
  roleId: number;
};

type UserContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext({
  user: null,
  setUser: (user: AuthUser | null) => {},
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {},
  logout: () => {}
} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const logoutHandler = async () => {
    const data = await AuthService.logout();
    setIsAuthenticated(data.isAuthenticated);
    setUser(data.user);
  };

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    });
  }, [setIsAuthenticated]);

  const contextValue: UserContextType = {
    user: user,
    setUser: setUser,
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated,
    logout: logoutHandler
  };

  return <div>{!isLoaded ? null : <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>}</div>;
};
