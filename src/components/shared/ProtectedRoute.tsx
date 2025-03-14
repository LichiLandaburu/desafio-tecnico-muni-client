import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectTo: string;
  children: React.ReactNode;
}

export function ProtectedRoute ({ isAllowed, redirectTo, children }: ProtectedRouteProps) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }
  return <>{children}</>;
};
