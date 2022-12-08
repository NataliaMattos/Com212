import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NavBar from "./componentes/navbar";
import Order from "./pages/Order";
import Login from "./pages/Login";
import { AccountContext, AccountProvider } from "./contexts/login";
import { useContext, useEffect } from "react";
import { Users } from "./pages/Users";

//FUNÇÃO QUE VERIFICA AS ROTAS PRIVADAS
// function RequireAuth({
//   children
// }: {
//   children: JSX.Element;
// }) {
//   const { isLogin } = useContext(AccountContext);

//   useEffect( () => {
//     console.log(isLogin)
// }, [isLogin]);

//   if (isLogin === 1) {
//     return <Navigate to="/Dashboard" replace />;
//   }

//   // if (isLogin === 2) {
//   //   return <Navigate to="/login" replace />;
//   // }

//   return children;
// }

export function Routess() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route
        path="/"
        element={
          
            <Login />
        }
      />
      <Route
        path="/Users"
        element={
          <NavBar>
            <Users />
          </NavBar>
        }
      />
      <Route
        path="/Dashboard"
        element={
          // <RequireAuth>
          <NavBar>
            <Dashboard />
          </NavBar>
          // </RequireAuth>
        }
      />
      <Route
        path="/Order"
        element={
          <NavBar>
            <Order />
          </NavBar>
        }
      />
      <Route
        path="/login"
        element={
          <AccountProvider>
            <Login />
          </AccountProvider>
        }
      />
    </Routes>
  );
}
