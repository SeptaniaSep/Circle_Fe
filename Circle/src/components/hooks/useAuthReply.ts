import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


interface ReplyPayload {
  description: string;
  image?: string | null;
}

export const useCreateReply = (parentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ReplyPayload) => {
      const res = await api.post(`/threads/${parentId}/reply`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["replies", parentId] });

    },
  });
};


interface Reply {
  id: string;
  description: string;
  image?: string;
  createdAt: string;
  likeCount: number;
  replyCount: number;
  author: {
    username: string;
    profile?: {
      avatar?: string;
      fullname?: string;
    };
  };
}

export const useGetReplies = (parentId: string) => {
  return useQuery<Reply[]>({
    queryKey: ["replies", parentId],
    queryFn: async () => {
      const res = await api.get<{ message: string; data: Reply[] }>(`/threads/${parentId}/reply`);
            
      return res.data.data;
    },
    refetchOnWindowFocus: false,
  });
};


export function useDeleteReply() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (replyId: string) => {
      const res = await api.delete(`/reply/${replyId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["replies"] });
    },
    onError: (error) => {
      console.error("Gagal menghapus reply:", error);
    },
  });
}

