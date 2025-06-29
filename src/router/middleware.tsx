import { Navigate, useLocation, useMatches, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth";
import { useEffect } from "react";
import type { RouteHandle } from "./routes";

export function RouteGuard() {
  const location = useLocation();
  const matches = useMatches();
  const auth = useAuthStore();

  type Meta = NonNullable<RouteHandle["meta"]>;
  const meta = matches.reduce<Partial<Meta>>((acc, match) => {
    const handle = match.handle as RouteHandle | undefined;
    return { ...acc, ...handle?.meta };
  }, {});

  useEffect(() => {
    if (meta.title) {
      document.title = `${meta.title} - Pisano`;
    } else {
      document.title = "Pisano";
    }
  }, [meta.title]);

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (meta.publicOnly && auth.isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />;
  }

  if (meta.requiresAuth && !auth.isAuthenticated) {
    return (
      <Navigate
        to="/auth/login"
        state={{ redirect: location.pathname }}
        replace
      />
    );
  }

  return <Outlet />;
}
