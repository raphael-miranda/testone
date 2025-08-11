import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const { setUser } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(email); // Simulated login
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow">
      <h1 className="text-2xl font-semibold text-gray-800">Login</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
