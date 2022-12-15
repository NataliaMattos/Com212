import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./componentes/navbar";
import { DemandProvider } from "./contexts/demand";
import { Demand } from "./pages/Demand";
import Login from "./pages/Login";
import Order from "./pages/Order";
import { Users } from "./pages/Users";

//FUNÇÃO QUE VERIFICA AS ROTAS PRIVADAS
function RequireAuth({ children,} : { children: JSX.Element}) {

  const userId = localStorage.getItem("userId");
  if (!userId) {
    return <Navigate to="/login" replace />;
  }else{
    return children;
  }
  
}

export function Routess() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Users"
        element={<RequireAuth>
          <NavBar>
            <Users />
          </NavBar>
        </RequireAuth>} />
      <Route path="/Order"
        element={<RequireAuth>
          <NavBar>
            <Order />
          </NavBar>
        </RequireAuth>} />

      <Route path="/Demand"
        element={<RequireAuth>
          <NavBar>
            <Demand />
          </NavBar>
        </RequireAuth>} />
    </Routes>
  );
}
