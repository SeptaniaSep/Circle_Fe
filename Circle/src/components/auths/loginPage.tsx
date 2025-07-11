import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  schemaAuthLogin,
  type schemaAuthLoginDTO,
} from "../schemas/schemaAuthLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useAuthLogin";

export default function LoginPage() {
  const navigate = useNavigate();
  const { mutate} = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaAuthLoginDTO>({
    mode: "onChange",
    resolver: zodResolver(schemaAuthLogin),
  });

  const handleLogin = (data: schemaAuthLoginDTO) => {
    navigate("/");
    mutate(data);
    console.log("data", data);
  };

  return (
    <div className="min-h-screen flex mt-10 justify-center text-white">
      <div className="w-full max-w-md px-6 py-8">
        <h1 className="text-4xl font-semibold text-green-600 mb-1">circle</h1>
        <h2 className="text-xl font-semibold mb-6">Login to Circle</h2>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-3">
          <Input
            type="text"
            placeholder="Email"
            {...register("email")}
            className="border border-gray-600 text-white"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}

          <Input
            type="password"
            placeholder="Password*"
            {...register("password")}
            className="border border-gray-600 text-white"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}

          <div className="text-right text-sm text-gray-400">
            <Link to="/forgot" className="hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button
            onClick={handleSubmit(handleLogin)}
            type="submit"
            className="w-full rounded-full bg-green-600 hover:bg-green-700 mt-2"
          >
            Login
          </Button>
        </form>

        <p className="mt-4 text-sm text-gray-400">
          Don't have an account yet?{" "}
          <Link to="/register" className="text-green-500 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
