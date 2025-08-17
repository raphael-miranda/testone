import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function CreatePost() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create post");
      return res.json();
    },
    onSuccess: () => {
      // ✅ refresh posts
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created successfully!");
      // ✅ redirect to posts page
      navigate("/posts");
    },
    onError: () => {
      toast.error("Failed to create post");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Create New Post</h2>

        <input
          {...register("title")}
          placeholder="Post Title"
          className={`w-full p-3 border rounded-lg mb-3 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mb-2">{errors.title.message}</p>
        )}

        <textarea
          {...register("content")}
          placeholder="Write your content..."
          rows={5}
          className={`w-full p-3 border rounded-lg mb-3 ${
            errors.content ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mb-2">{errors.content.message}</p>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {mutation.isPending ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
