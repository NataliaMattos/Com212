import { Route, Routes } from "react-router-dom";
import NavBar from "./componentes/navbar";
import { DemandProvider } from "./contexts/demand";
import { Demand } from "./pages/Demand";
import Login from "./pages/Login";
import Order from "./pages/Order";
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
      <Route path="/" element={<Login />} />
      <Route
        path="/Users"
        element={
          <NavBar>
            <Users />
          </NavBar>
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
          <NavBar>
            <Login />
          </NavBar>
        }
      />
      <Route
        path="/Demand"
        element={
          <NavBar>
            <Demand />
          </NavBar>
        }
      />
    </Routes>
  );
}
