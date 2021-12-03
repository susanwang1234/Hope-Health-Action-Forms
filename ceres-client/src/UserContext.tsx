import React, { useState, useEffect, createContext } from 'react';
import AuthService from './services/authService';

export type AuthUser = {
  id: number;
  username: string;
  departmentId: number;
  roleId: number;
  currentDepartmentIDLocation: number;
};

type UserContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  currentDepartmentIDLocation: number | null;
  setUser: (user: AuthUser | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setCurrentDepartmentIDLocation: (departmentID: number) => void;
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
  currentDepartmentIDLocation: null,
  setCurrentDepartmentIDLocation: (departmentID: number) => {},
  logout: () => {}
} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentDepartmentIDLocation, setCurrentDepartmentIDLocation] = useState<number | null>(null);

  const logoutHandler = async () => {
    const data = await AuthService.logout();
    setIsAuthenticated(data.isAuthenticated);
    setUser(data.user);
  };

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      console.log('WHAT I GOT', data.user);
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      if (data.user) {
        data.user.roleName === 'user' ? setCurrentDepartmentIDLocation(1) : setCurrentDepartmentIDLocation(data.user.roleId);
      } else {
        setCurrentDepartmentIDLocation(null);
      }
      setIsLoaded(true);
    });
  }, [setIsAuthenticated]);

  const contextValue: UserContextType = {
    user: user,
    setUser: setUser,
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated,
    currentDepartmentIDLocation: currentDepartmentIDLocation,
    setCurrentDepartmentIDLocation: setCurrentDepartmentIDLocation,
    logout: logoutHandler
  };

  return <div>{!isLoaded ? null : <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>}</div>;
};
