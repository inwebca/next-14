// /app/sign-in/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthUserContext";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { signIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/"); // Redirect to homepage if already signed in
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await signIn(email, password);
      router.push("/");
    } catch (err) {
      setError(
        "Failed to sign in. Please check your credentials and try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sign In
        </button>

        <p className="mt-4">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-blue-500">
            Sign up here
          </a>
          .
        </p>
      </form>
    </div>
  );
}
