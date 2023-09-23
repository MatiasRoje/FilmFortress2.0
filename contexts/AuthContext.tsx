"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
};

type AuthAction =
  | { type: "login"; payload: User }
  | { type: "logout" }
  | { type: "error"; payload: string | null };

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case "logout":
      return { ...state, user: null, isAuthenticated: false, error: null };
    case "error":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER: User = {
  username: "Alice",
  id: 1,
  email: "alice@example.com",
  password: "Alice123",
};

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [{ user, isAuthenticated, error }, dispatch]: [
    AuthState,
    Dispatch<AuthAction>,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    let errorTimeout: NodeJS.Timeout | null = null;

    if (error) {
      // Set a timeout to clear the error message after 3 seconds (adjust the time as needed)
      errorTimeout = setTimeout(() => {
        dispatch({ type: "error", payload: null });
      }, 3000);
    }

    // Clear the timeout when the component unmounts
    return () => {
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }
    };
  }, [error]);

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      dispatch({ type: "error", payload: "Invalid email or password" });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
