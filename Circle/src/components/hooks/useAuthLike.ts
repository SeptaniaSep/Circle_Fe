import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface IsLikedResponse {
  isLiked: boolean;
}

interface LikeCountResponse {
  total: number;
}

export function useThreadLikeStatus(threadId: string) {
  const { data: isLikedData } = useQuery({
    queryKey: ["threadLikes", threadId],
    queryFn: async () => {
      const res = await api.get<IsLikedResponse>(`/like/${threadId}`);
      return res.data.isLiked;
    },
  });

  const { data: likeCountData } = useQuery({
    queryKey: ["threadLikeCount", threadId],
    queryFn: async () => {
      const res = await api.get<LikeCountResponse>(`/like/total/${threadId}`);
      return res.data.total;
    },
  });

  return {
    isLiked: isLikedData ?? false,
    likeCount: likeCountData ?? 0,
  };
}
