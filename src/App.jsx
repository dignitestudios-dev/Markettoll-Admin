import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import UserProvider from "./context/UserContext";
import { useContext} from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn,"isLog");
  
  return (
    <UserProvider>
      <Routes>
        {AppRoutes.map((route, index) => {
          // if (route.isPrivate && !isLoggedIn) {
          //   return <Route path={route.url} element={<Navigate to="/login" />} key={index} />;
          // }
          return <Route path={route.url} element={route.page} key={index} />;
        })}
      </Routes>
    </UserProvider>
  );
}

export default App;
