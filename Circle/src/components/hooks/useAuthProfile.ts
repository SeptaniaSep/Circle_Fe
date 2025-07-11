import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie"
import { api } from "@/lib/api";
import type { typeProfilePayload } from "../schemas/schemaAuthProfile";


// UPDATE PROFILE
export async function updateProfile(userId: string, data: FormData) {
  try {
    const response = await api.put(`/profile/${userId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("❌ Error saat update profile:", error.response?.data || error.message);
    throw error.response?.data || { message: "Gagal update profile" };
  }
}


// GET PROFILE
export function useGetProfile() {
  return useQuery<typeProfilePayload, Error>({
    
    queryKey: ["profile"],
    queryFn: async () => {
      const token = Cookies.get("token")
      if (!token) {
        throw new Error("Token tidak ditemukan, Harap login...")
      }
      const res = await api.get<typeProfilePayload>("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      return res.data
    }
  })
}


// EDIT PROFILE

