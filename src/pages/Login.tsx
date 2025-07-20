import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (email !== "admin@pisano.com" || password !== "password") {
      setError("Wrong email or password");
      return;
    }

    try {
      await login({ email, password });
      navigate("/app/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      aria-labelledby="login-form-title"
      role="form"
    >
      <h2 id="login-form-title" className="sr-only">
        Sign in to your account
      </h2>
      <label htmlFor="email-input" className="flex flex-col">
        Email
        <input
          id="email-input"
          type="email"
          value={email}
          autoComplete="username"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full rounded border border-gray-300 px-2 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-required="true"
          aria-label="Email address"
        />
      </label>
      <label htmlFor="password-input" className="flex flex-col">
        Password
        <input
          id="password-input"
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 w-full rounded border border-gray-300 px-2 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-required="true"
          aria-label="Password"
        />
      </label>
      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        aria-busy={isLoading}
        aria-disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
      {error && (
        <div
          className="mt-2 text-center text-red-600"
          role="alert"
          aria-live="assertive"
        >
          <p>{error}</p>
        </div>
      )}
    </form>
  );
}
