"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("alice@example.com");
  const [password, setPassword] = useState("Alice123");
  const { login, isAuthenticated, error } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.back();
    }
  }, [isAuthenticated, router]);

  function handleLogin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    }
  }

  return (
    <form className="flex flex-col gap-6 w-1/2 bg-neutral-700 rounded p-6">
      <h2 className="text-xl font-semibold">Login</h2>
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          className="text-neutral-800 border-none px-4 py-2 text-lg rounded w-[36rem] transition-all duration-300 focus:outline-none focus:shadow-lg"
        />
      </div>

      <div className="flex flex-col gap-">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          className="text-neutral-800 border-none px-4 py-2 text-lg rounded w-[36rem] transition-all duration-300 focus:outline-none focus:shadow-lg"
        />
      </div>

      <>
        {error && (
          <p className="text-center p-2 border border-red-500 rounded text-red-700 bg-red-200 text-sm w-52">
            {error}
          </p>
        )}
      </>

      <div>
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </form>
  );
}

export default LoginForm;
