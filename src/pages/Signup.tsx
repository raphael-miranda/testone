import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

// validation schema
const schema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function Signup() {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const onSubmit = (data: FormData) => {
    console.log("signup success:", data);
    login(); // auto-login after signup
    navigate("/posts");
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        {/* Email */}
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

        {/* Password */}
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

        {/* Confirm Password */}
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm Password"
          className={`w-full p-3 border rounded-lg mb-3 ${
            formState.errors.confirmPassword ? "border-red-500" : "border-gray-300"
          }`}
        />
        {formState.errors.confirmPassword && (
          <p className="text-red-500 text-sm mb-2">
            {formState.errors.confirmPassword.message}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
