import { useAuthStore } from "../store/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export default function PostList() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const { data, isLoading, isError } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p className="text-center mt-10">Loading posts...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Error loading posts</p>;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="px-6 py-10">
      {/* Header with Logout button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Post list */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.slice(0, 12).map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 text-sm">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
