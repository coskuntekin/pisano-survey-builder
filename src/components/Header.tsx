import React from "react";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  user: { name: string } | null;
  logout: () => void;
  isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ user, logout, isLoading }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-8">
        <h1 className="text-lg font-semibold">Pisano Survey Builder</h1>
        <nav className="flex gap-4">
          <NavLink
            to="/app/dashboard"
            end
            className={({ isActive }) =>
              [
                "px-3 py-2 rounded transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-blue-700 hover:bg-blue-100",
              ].join(" ")
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/app/survey-builder"
            className={() => {
              const active =
                typeof window !== "undefined" &&
                window.location.pathname.startsWith("/app/survey-builder");
              return [
                "px-3 py-2 rounded transition-colors",
                active
                  ? "bg-blue-600 text-white"
                  : "text-blue-700 hover:bg-blue-100",
              ].join(" ");
            }}
          >
            Survey Builder
          </NavLink>
        </nav>
      </div>
      <div className="flex items-center gap-x-4">
        {user && <span className="font-medium">Welcome, {user.name}!</span>}
        <button
          type="button"
          onClick={logout}
          disabled={isLoading}
          className="px-4 py-2 cursor-pointer border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </header>
  );
};

export default Header;
