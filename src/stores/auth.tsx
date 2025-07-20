import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse auth data from localStorage", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (credentials: { email: string; password: string }): Promise<void> => {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const dummyUser: User = {
        id: "1",
        name: "Jane Doe",
        email: credentials.email,
      };
      const dummyToken = "dummy-jwt-token-for-" + credentials.email;

      setUser(dummyUser);
      setToken(dummyToken);

      localStorage.setItem("user", JSON.stringify(dummyUser));
      localStorage.setItem("token", dummyToken);

      setIsLoading(false);
    },
    [],
  );

  const logout = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      setUser(null);
      setToken(null);

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      setIsLoading(false);
    }, 500);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: !!token,
      user,
      token,
      isLoading,
      login,
      logout,
    }),
    [user, token, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthStore() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuthStore must be used within an AuthProvider");
  }
  return context;
}
