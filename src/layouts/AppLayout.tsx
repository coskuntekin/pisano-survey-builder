import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth";
import { useEffect } from "react";
import Header from "../components/Header";
import { SurveyProvider } from "../context/SurveyContext";

export default function AppLayout() {
  const { user, logout, isLoading } = useAuthStore();
  const navigate = useNavigate();

  return (
    <SurveyProvider>
      <AppLayoutContent
        user={user}
        logout={logout}
        isLoading={isLoading}
        navigate={navigate}
      />
    </SurveyProvider>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AppLayoutContent({ user, logout, isLoading, navigate }: any) {
  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header user={user} logout={logout} isLoading={isLoading} />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
