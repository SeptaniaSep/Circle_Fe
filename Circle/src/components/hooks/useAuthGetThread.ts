import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Cookies from "js-cookie";
import type { typeThread, typeThreadPayload, typeThreadSinggel } from "../schemas/schemaAuthThread";


export function useGetThreads() {
  return useQuery<typeThreadPayload, Error>({
    queryKey: ["threads"],
    queryFn: async () => {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Harap login kembali.");
      }

      const res = await api.get<typeThreadPayload>("/threads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return res.data;
    },
    
  });
}


export function useGetThreadsByAuthorId() {
  return useQuery<typeThreadPayload, Error>({
    queryKey: ["threads"],
    queryFn: async () => {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Harap login kembali.");
      }

      const res = await api.get<typeThreadPayload>("/threadbi", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });
}



export function useGetThreadByIdThread(id: string) {
  return useQuery<typeThreadSinggel, Error, typeThread>({
    queryKey: ["thread", id],
    queryFn: async () => {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Harap login kembali.");
      }

      const res = await api.get<typeThreadSinggel>(`/thread/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data; // bentuk: { message: "...", data: {...} }
    },
    select: (res) => res.data,
    enabled: !!id,
  });
}






