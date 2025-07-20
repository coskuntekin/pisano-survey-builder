import { Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth";
import Header from "../components/Header";
import { SurveyProvider } from "../context/SurveyContext";

export default function AppLayout() {
  const { user, logout, isLoading } = useAuthStore();

  return (
    <SurveyProvider>
      <section className="min-h-screen flex flex-col bg-gray-50">
        <Header user={user} logout={logout} isLoading={isLoading} />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </section>
    </SurveyProvider>
  );
}
