// Hooks
import { Navigate } from "react-router-dom";

// Utils
import { useAuth } from "../context/AuthProvider";

export default function EmailVerifiedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" />;

  if (!user.emailVerified) return <Navigate to="/verify-email" />;

  return children;
}
