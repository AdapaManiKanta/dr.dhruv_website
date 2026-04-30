import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/lib/supabase";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  // Not logged in → go to login
  if (!user) return <Navigate to="/login" replace />;

  // Wrong role → go to their correct dashboard
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    const redirectMap: Record<UserRole, string> = {
      admin:     "/dashboard/admin",
      therapist: "/dashboard/therapist",
      patient:   "/dashboard/patient",
    };
    return <Navigate to={redirectMap[role]} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
