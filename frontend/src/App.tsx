import { BrowserRouter } from "react-router-dom";
import { AccountProvider } from "./contexts/login";
import { Routess } from "./Routes";

export function App() {
  return (
    <>
      <BrowserRouter>
      <AccountProvider>
          <Routess />
        </AccountProvider>
      </BrowserRouter>
    </>
  );
}
