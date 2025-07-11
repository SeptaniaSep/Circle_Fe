import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";

interface IsLikedResponse {
  isLiked: boolean;
}

interface TotalLikeResponse {
  total: number;
}

export function useLike(threadId: string) {
  const queryClient = useQueryClient();
  const [isHovered, setIsHovered] = useState(false);

  // Ambil status like
  const { data: isLikedData } = useQuery<IsLikedResponse>({
    queryKey: ["isLiked", threadId],
    queryFn: async () => {
      const res = await api.get<IsLikedResponse>(`/like/${threadId}`);
      return res.data;
    },
  });

  // Ambil total like
  const { data: likeCountData } = useQuery<TotalLikeResponse>({
    queryKey: ["likeCount", threadId],
    queryFn: async () => {
      const res = await api.get<TotalLikeResponse>(`/like/total/${threadId}`);
      return res.data;
    },
  });

  // Like
  const likeMutation = useMutation({
    mutationFn: async () => {
      await api.post(`/like`, { threadId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isLiked", threadId] });
      queryClient.invalidateQueries({ queryKey: ["likeCount", threadId] });
    },
  });

  // Unlike
  const unlikeMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/like`, {
        data: { threadId },
      } as any); // TypeScript tidak error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isLiked", threadId] });
      queryClient.invalidateQueries({ queryKey: ["likeCount", threadId] });
    },
  });

  const handleLikeClick = () => {
    if (isLikedData?.isLiked) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  return {
    likeCount: likeCountData?.total ?? 0,
    isLiked: isLikedData?.isLiked ?? false,
    isHovered,
    setIsHovered,
    handleLikeClick,
  };
}
