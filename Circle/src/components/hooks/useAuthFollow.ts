import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";



export type FollowerUser = {
  id: string;
  username: string;
  fullname: string;
  avatar: string | null;
  bio: string | null;
  isFollowing: boolean;
};


export function useGetFollowersById(userId: string) {
  return useQuery<FollowerUser[]>({
    queryKey: ["followers", userId],
    queryFn: async () => {
      const res = await api.get<{ data: FollowerUser[] }>(`/followers/by-id/${userId}`);
      return res.data.data;
    },
    enabled: !!userId,
  });
}

export function useGetFollowingById(userId: string) {
  return useQuery<FollowerUser[]>({
    queryKey: ["following", userId],
    queryFn: async () => {
      const res = await api.get<{ data: FollowerUser[] }>(`/following/by-id/${userId}`);
      return res.data.data;
    },
    enabled: !!userId,
  });
}


