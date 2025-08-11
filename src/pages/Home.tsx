import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to MyApp</h1>
        <p className="mt-4 text-gray-600">
          Start your journey with us. Please login or sign up to continue.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate("/login")}
            className="rounded bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="rounded bg-green-600 px-6 py-2 font-medium text-white transition hover:bg-green-700"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
