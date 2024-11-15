import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import UserProvider from "./context/UserContext";

function App() {

  return (
    <UserProvider>
      <Routes>
        {AppRoutes.map((route, index) => {
          return <Route path={route.url} element={route.page} key={index} />;
        })}
      </Routes>
    </UserProvider>
  );
}

export default App;
