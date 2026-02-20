import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn, isCheckingAuth }) {
  const location = useLocation();

  if (isCheckingAuth) {
    return null; // or a loading spinner
  }

  if (!isLoggedIn && location.pathname !== "/") return <Navigate to="/" />;
  return children;
}

export default ProtectedRoute;
