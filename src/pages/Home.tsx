import React from "react";

const Home: React.FC = () => {
  return (
    <div className="rounded-lg bg-white p-8 shadow">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to MyApp</h1>
      <p className="mt-4 text-gray-600">
        This is your new React + Tailwind + Zustand + Router setup with a clean
        and modern UI. Use the navigation bar to explore.
      </p>

    </div>
  );
};

export default Home;
