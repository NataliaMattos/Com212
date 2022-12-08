import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface Account {
  login: string,
  senha: string;
}

export interface Users {
  name: string,
  lastName: string;
  email: string;
  password: string;
}

interface AccountContextData {
  login: Account;
  setLogin: (value: Account) => void;
  isLogin: number;
  setIsLogin: (value: number) => void;
  users: Users[];
}

interface AccountProviderProps {
  children: ReactNode;
}

export const AccountContext = createContext({} as AccountContextData);

export function  AccountProvider({ children }:  AccountProviderProps) {
   const [ login, setLogin] = useState<Account>({login: "", senha: ""});
   const [ isLogin, setIsLogin] = useState<number>(0);
   const [ users, setUsers] = useState<Users[]>([]);
   const [ refresh, setRefresh] = useState<boolean>(false);
   const navigate = useNavigate();
   
  useEffect( () => {
    if(login.senha !== ""){
        console.log("aqui");
        setIsLogin(1);
        // navigate('/Dashboard', { replace: true })
        axios.post("http://localhost:3000/account", { email: login.login, password: login.senha })
        .then((response) => {
            if(response.data.length > 0){
                setIsLogin(1);
                setIsLogin(1);
                navigate('/home', { replace: true })
            }else{
                setIsLogin(2);
                setIsLogin(2);
            }
            console.log(response.data)
        })
    }
}, [login]);


useEffect( () => {
    axios.get('/users').then((response) => {
      console.log(response.data)
      setUsers(response.data);
    })
  }, [refresh]);

  useEffect( () => {
    console.log(login)
}, [login]);

  useEffect( () => {
    // if(isLogin === 1){
    //     navigate('/Dashboard', { replace: true })

    // }
    console.log(isLogin);
}, [isLogin]);

  return (
    <AccountContext.Provider value={{login, setLogin, isLogin, setIsLogin, users}} >
      {children}
    </AccountContext.Provider>
  )
}