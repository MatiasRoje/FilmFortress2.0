"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

function LoginForm() {
  const router = useRouter();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("alice@example.com");
  const [password, setPassword] = useState("Alice123");
  const { data: session } = useSession();
  const [error, setError] = useState("");

  useEffect(() => {
    if (session) {
      router.back();
    }
  }, [session, router]);

  async function handleLogin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="mx-4 flex w-full flex-col gap-6 rounded bg-neutral-700 p-6 md:w-1/2">
      <h2 className="text-xl font-semibold">Login</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          className="w-full rounded border-none px-4 py-2 text-lg text-neutral-800 transition-all duration-300 focus:outline-none focus:ring focus:ring-main-400"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          className="w-full rounded border-none px-4 py-2 text-lg text-neutral-800 transition-all duration-300 focus:outline-none focus:ring focus:ring-main-400"
        />
      </div>

      <>
        {error && (
          <p className="w-52 rounded border border-red-500 bg-red-200 p-2 text-center text-sm text-red-700">
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
