import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body: string;
}

// fetch single post
const fetchPost = async (id: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
};

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: post, isLoading, isError } = useQuery<Post>({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id!),
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError || !post) return <p className="text-center mt-10">Error loading post.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <Link to="/posts" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Posts
      </Link>

      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-6">{post.body}</p>

      {/* Comments Section Skeleton */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Comments</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-gray-800 font-medium">User 1</p>
            <p className="text-gray-700">This is a sample comment.</p>
          </div>
          <div className="p-4 border rounded-lg bg-gray-50 ml-4">
            <p className="text-gray-800 font-medium">User 2</p>
            <p className="text-gray-700">This is a nested comment example.</p>
          </div>
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-gray-800 font-medium">User 3</p>
            <p className="text-gray-700">Another comment placeholder.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
