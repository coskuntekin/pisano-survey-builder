import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <section className="bg-auth flex min-h-screen w-full items-center justify-center">
      <div
        className="flex w-full max-w-md flex-col items-center rounded-lg bg-white/50 px-4 py-8 shadow-md backdrop-blur-md sm:px-8 sm:py-12"
        role="region"
        aria-label="Authentication container"
      >
        <header className="mb-8 text-center" role="banner">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl" tabIndex={-1}>
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
