import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type { schemaAuthRegisterDTO } from "../schemas/schemaAuthRegister";


export function useRegister() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: schemaAuthRegisterDTO ) => {
      const res = await api.post("/register", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Register success! Please login.");
      navigate("/login");
    },
    onError: (error: any) => {
      // Tangani error dari axios
      const message =
        error?.response?.data?.message || "Terjadi kesalahan saat melakukan register";
      toast.error(message);
      console.error("❌ eror:", error);
    },
  });

  return { mutate, isPending };
}
