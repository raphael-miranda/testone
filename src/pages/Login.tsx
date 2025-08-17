import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const onSubmit = (data: FormData) => {
    console.log("login success:", data);
    login();
    navigate("/posts");
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          {...register("email")}
          placeholder="Email"
          className={`w-full p-3 border rounded-lg mb-3 ${
            formState.errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {formState.errors.email && (
          <p className="text-red-500 text-sm mb-2">
            {formState.errors.email.message}
          </p>
        )}

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className={`w-full p-3 border rounded-lg mb-3 ${
            formState.errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {formState.errors.password && (
          <p className="text-red-500 text-sm mb-2">
            {formState.errors.password.message}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
