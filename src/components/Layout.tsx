import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Layout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/login", label: "Login" },
    { to: "/signup", label: "Signup" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-6">
            <span className="text-xl font-bold text-blue-600">MyApp</span>
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`transition-colors hover:text-blue-600 ${
                  location.pathname === to ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="rounded bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {user}
              </span>
              <button
                onClick={logout}
                className="rounded bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <span className="text-gray-500">Guest</span>
          )}
        </div>
      </nav>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
