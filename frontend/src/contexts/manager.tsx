import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface Manager {
  id?: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
}

interface ManagerProviderProps {
  children: ReactNode;
}

export interface Managers {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
}

interface ManagerContextData {
  managers: Managers[];
  refresh: boolean;
  setRefresh: (value: boolean) => void;
  isLoading: boolean;
}

export const ManagerContext = createContext({} as ManagerContextData);

export function ManagerProvider({ children }: ManagerProviderProps) {
  const [managers, setManagers] = useState<Managers[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/managers").then((response) => {
      setManagers(response.data);
      setIsLoading(true);
    });
  }, [refresh]);

  return (
    <ManagerContext.Provider value={{ managers, refresh, setRefresh, isLoading }}>
      {children}
    </ManagerContext.Provider>
  );
}
