import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { api } from "@/lib/api";

export function useCreateThread() {
    const queryClient = useQueryClient()


    return useMutation ({
        // ganti sebentar schemanyasama formdata itu sebenarnya data
        mutationFn: async (formData: FormData) => { 
            const token = Cookies.get("token")
            const res = await api.post("/thread" ,formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "multipart/form-data", //untuk formData
                }
            })
            return res.data
        },
        onSuccess: () => {
            toast.success("Thread berhasil diposting.....!")
            queryClient.invalidateQueries({ queryKey: ["threads"]})
            // navigate("/")
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Gagal memposting thread")
        }
    }
         
    )
}