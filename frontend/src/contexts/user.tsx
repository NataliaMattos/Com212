import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';

export interface User {
    id?: string;
    name: string,
    lastName: string;
    email: string;
    password: string;
  }

interface UserProviderProps {
  children: ReactNode;
}

export interface Users {
    id: string;
    name: string,
    lastName: string;
    email: string;
    password: string;
  }

interface UserContextData {
    users: Users[];
    refresh: boolean;
    setRefresh: (value: boolean) => void;
    isLoading: boolean;
}

export const UserContext = createContext({} as UserContextData);

export function  UserProvider({ children }:  UserProviderProps) {
   const [ users, setUsers] = useState<Users[]>([{id: "qqqq", name: "natalia", lastName: "mattos", email: "nat@nat.com", password: "12345"}]);
   const [ refresh, setRefresh] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

  useEffect( () => {
    setIsLoading(false);
    // axios.get('/users').then((response) => {
        // console.log(response.data)
        // setUsers(response.data);
        setIsLoading(true);
    // })
  }, [refresh]);


  return (
    <UserContext.Provider value={{users, refresh, setRefresh,  isLoading}} >
      {children}
    </UserContext.Provider>
  )
}