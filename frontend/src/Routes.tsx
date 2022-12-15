import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./componentes/navbar";
import { DemandProvider } from "./contexts/demand";
import { Admins } from "./pages/Admin";
import { Demand } from "./pages/Demand";
import Login from "./pages/Login";
import { Managers } from "./pages/Managers";
import Order from "./pages/Order";
import { Users } from "./pages/Users";

//FUNÇÃO QUE VERIFICA AS ROTAS PRIVADAS
function RequireAuth({ children, role }: { children: JSX.Element , role: string}) {
  const userType = localStorage.getItem("userType");

if(userType !== ''){
  switch (userType){
    case 'manager':
      if (role === 'manager' || role === 'demand' || role === 'user' || role === 'order') {
        return children;
      }else{
        return <Navigate to="/Demand" replace />;
      }
    case 'user':
      if (role === 'demand' || role === 'user') {
        return children;
      }else{
        return <Navigate to="/Demand" replace />;
      }
    case 'admin':
        return children;
    default:
      return <Navigate to="/Login" replace />;
  }
}else{
  return <Navigate to="/Login" replace />;
}

  
}

export function Routess() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Users"
        element={<RequireAuth role='user'>
          <NavBar>
            <Users />
          </NavBar>
        </RequireAuth>} />

      <Route path="/Managers"
        element={<RequireAuth role='manager'>
          <NavBar>
            <Managers />
          </NavBar>
        </RequireAuth>} />

      <Route path="/Order"
        element={<RequireAuth role='order'>
          <NavBar>
            <Order />
          </NavBar>
        </RequireAuth>} />

      <Route path="/Demand"
        element={<RequireAuth role='demand'>
          <NavBar>
            <Demand />
          </NavBar>
        </RequireAuth>} />

      <Route path="/Admin"
        element={<RequireAuth role='admin'>
          <NavBar>
            <Admins />
          </NavBar>
        </RequireAuth>} />
    </Routes>
  );
}

