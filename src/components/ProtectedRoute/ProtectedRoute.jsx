import { Navigate, useLocation } from "react-router-dom";
function ProtectedRoute({ children, user }) {
  const location = useLocation();
  if (user && location.pathname !== "/") return <Navigate to="/" />;
  return children;
}

export default ProtectedRoute;
