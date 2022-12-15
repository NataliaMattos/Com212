import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface Admin {
  id?: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  branch: string;
  department: string;
}

interface AdminProviderProps {
  children: ReactNode;
}

export interface Admins {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  branch: string;
  department: string;
}

interface AdminContextData {
  admins: Admins[];
  refresh: boolean;
  setRefresh: (value: boolean) => void;
  isLoading: boolean;
}

export const AdminContext = createContext({} as AdminContextData);

export function AdminProvider({ children }: AdminProviderProps) {
  const [admins, setAdmins] = useState<Admins[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/admins").then((response) => {
      setAdmins(response.data);
      setIsLoading(true);
    });
  }, [refresh]);

  return (
    <AdminContext.Provider value={{ admins, refresh, setRefresh, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
}
