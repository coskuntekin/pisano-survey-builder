import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-auth">
      <div
        className="w-full max-w-md px-4 py-8 sm:px-8 sm:py-12 bg-white/50 backdrop-blur-md rounded-lg shadow-md flex flex-col items-center"
        role="region"
        aria-label="Authentication container"
      >
        <header className="mb-8 text-center" role="banner">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2" tabIndex={-1}>
            Welcome to Pisano
          </h1>
          <p className="text-gray-600" id="auth-desc">
            Please sign in to continue
          </p>
        </header>
        <main className="w-full" role="main" aria-describedby="auth-desc">
          <Outlet />
        </main>
      </div>
    </section>
  );
}
