// Hooks
import { Navigate } from "react-router-dom";

// Utils
import { useAuth } from "../context/AuthProvider";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? children : <Navigate to="/login" />;
}
