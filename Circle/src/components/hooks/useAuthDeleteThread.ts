import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteThread() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (threadId: string) => {
        console.log("Delete ID yang dikirim:", threadId); 
      const res = await api.delete(`/thread/${threadId}`); 
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] }); 
    },
    onError: (error) => {
      console.error("Gagal menghapus thread:", error);
    },
  });
}
