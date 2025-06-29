import { Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth";

export default function AppLayout() {
  const { user, logout, isLoading } = useAuthStore();

  return (
    <div>
      <aside>
        <div>
          <h2>Pisano App</h2>
        </div>
      </aside>

      <div>
        <header>
          <div>{user && <span>Welcome, {user.name}!</span>}</div>
          <button onClick={logout} disabled={isLoading}>
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
