
import { createContext, ReactNode, useEffect, useState } from 'react';

interface DemandProviderProps {
  children: ReactNode;
}

interface DemandContextData {
    refresh: boolean;
    setRefresh: (value: boolean) => void;
}

export const DemandContext = createContext({} as DemandContextData);

export function  DemandProvider({ children }:  DemandProviderProps) {
   const [ refresh, setRefresh] = useState(false);

  return (
    <DemandContext.Provider value={{refresh, setRefresh}} >
      {children}
    </DemandContext.Provider>
  )
}