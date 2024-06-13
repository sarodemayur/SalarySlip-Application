import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
    children: JSX.Element;
}

export const PrivateRoute = ({children}: PrivateRouteProps) => {
  const location = useLocation();
  const isLoggedin = localStorage.getItem('isLoggedin');
  return isLoggedin ? (
    children
  ) : (
     <Navigate to={'/login'} state={location.pathname} />
  );
}