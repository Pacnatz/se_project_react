import { Navigate, useLocation } from "react-router-dom";
function ProtectedRoute({ children, user }) {
  const location = useLocation();
  if (!user._id && location.pathname !== "/") return <Navigate to="/" />;
  return children;
}

export default ProtectedRoute;
