import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";

interface IsLikedResponse {
  isLiked: boolean;
}

interface TotalLikeResponse {
  threadId: string;
  total: number;
}

export function useLike(threadId: string) {
  const queryClient = useQueryClient();
  const [isHovered, setIsHovered] = useState(false);

  const { data: isLikedData, isLoading: isLikedLoading } =
    useQuery<IsLikedResponse>({
      queryKey: ["isLiked", threadId],
      queryFn: async () => {
        const res = await api.get<IsLikedResponse>(`/like/${threadId}`);
        return res.data;
      },
      enabled: !!threadId,
    });

  // Ambil total like dari thread
  const { data: likeCountData, isLoading: likeCountLoading } =
    useQuery<TotalLikeResponse>({
      queryKey: ["likeCount", threadId],
      queryFn: async () => {
        const res = await api.get<TotalLikeResponse>(`/like/total/${threadId}`);
        return res.data;
      },
      enabled: !!threadId,
    });

  // Like (POST)
  const likeMutation = useMutation({
    mutationFn: async () => {
      await api.post(`/like`, { threadId });
    },
    onMutate: async () => {
      const prevLike = queryClient.getQueryData<TotalLikeResponse>([
        "likeCount",
        threadId,
      ]);
      const prevIsLiked = queryClient.getQueryData<IsLikedResponse>([
        "isLiked",
        threadId,
      ]);

      queryClient.setQueryData(["likeCount", threadId], {
        threadId,
        total: (prevLike?.total ?? 0) + 1,
      });

      queryClient.setQueryData(["isLiked", threadId], {
        isLiked: true,
      });

      return { prevLike, prevIsLiked };
    },
    onError: (_err, _vars, context) => {
      if (context?.prevLike) {
        queryClient.setQueryData(["likeCount", threadId], context.prevLike);
      }
      if (context?.prevIsLiked) {
        queryClient.setQueryData(["isLiked", threadId], context.prevIsLiked);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likeCount", threadId] });
      queryClient.invalidateQueries({ queryKey: ["isLiked", threadId] });
    },
  });

  // Unlike (DELETE)
  const unlikeMutation = useMutation({
    mutationFn: async () => {
      await api.request({
        method: "DELETE",
        url: "/unlike",
        data: { threadId },
      });
    },
    onMutate: async () => {
      const prevLike = queryClient.getQueryData<TotalLikeResponse>([
        "likeCount",
        threadId,
      ]);
      const prevIsLiked = queryClient.getQueryData<IsLikedResponse>([
        "isLiked",
        threadId,
      ]);

      queryClient.setQueryData(["likeCount", threadId], {
        threadId,
        total: Math.max(0, (prevLike?.total ?? 1) - 1),
      });

      queryClient.setQueryData(["isLiked", threadId], {
        isLiked: false,
      });

      return { prevLike, prevIsLiked };
    },
    onError: (_err, _vars, context) => {
      if (context?.prevLike) {
        queryClient.setQueryData(["likeCount", threadId], context.prevLike);
      }
      if (context?.prevIsLiked) {
        queryClient.setQueryData(["isLiked", threadId], context.prevIsLiked);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likeCount", threadId] });
      queryClient.invalidateQueries({ queryKey: ["isLiked", threadId] });
    },
  });

  const handleLikeClick = () => {
    if (isLikedData?.isLiked) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  const isLoading =
    likeMutation.isPending ||
    unlikeMutation.isPending ||
    isLikedLoading ||
    likeCountLoading;

  return {
    likeCount: likeCountData?.total ?? 0,
    isLiked: isLikedData?.isLiked ?? false,
    isHovered,
    setIsHovered,
    handleLikeClick,
    isLoading,
  };
}
