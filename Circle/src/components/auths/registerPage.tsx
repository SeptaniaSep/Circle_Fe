import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { schemaAuthRegister, type schemaAuthRegisterDTO } from "../schemas/schemaAuthRegister";

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaAuthRegisterDTO>({
    mode: "onChange",
    resolver: zodResolver(schemaAuthRegister),
  });

  const handleRegister = async (data: schemaAuthRegisterDTO) => {
    try {
      console.log(data);
      const res = await api.post("/register", data);
      toast.success("Register Berhasil");
      navigate("/login");
      return res.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Salah .... !";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex mt-10 justify-center bg-[#111] text-white">
      <div className="w-full max-w-md px-6 py-8">
        <h1 className="text-4xl font-semibold text-green-600 mb-1">circle</h1>
        <h2 className="text-xl font-semibold mb-6">Create account Circle</h2>

        <form className="space-y-3" onSubmit={handleSubmit(handleRegister)}>
          <Input
            type="text"
            placeholder="Full Name*"
            className="border border-gray-600 text-white"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
          <Input
            type="email"
            placeholder="Email*"
            className="border border-gray-600 text-white"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <Input
            type="password"
            placeholder="Password*"
            className="border border-gray-600 text-white"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <Button
            type="submit"
            className="w-full rounded-full bg-green-600 hover:bg-green-700"
          >
            Create
          </Button>
        </form>

        <p className="mt-4 text-sm text-gray-400">
          Already have account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
