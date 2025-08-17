import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome</h1>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
