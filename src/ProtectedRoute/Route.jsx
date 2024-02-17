import { Navigate, Outlet } from "react-router-dom";
import UseAuth from "./UseAuth";

const PRoute = () => {
  const { loggedIn } = UseAuth();

  if (!loggedIn) {
    return "Loading....";
  }
  return loggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};
//: <Navigate to={"/login"} />;

export default PRoute;
