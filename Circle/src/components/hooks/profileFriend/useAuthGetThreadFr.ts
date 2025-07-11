import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface Thread {
  id: string;
  description: string;
  image?: string;
  _count: {
    like: number;
    replies: number;
  };
  author: {
    username: string;
    profile: {
      avatar: string;
      fullname: string;
    };
  };
}

export const useFriendThreads = (username: string) => {
  return useQuery<Thread[]>({
    queryKey: ["friend-threads", username],
    queryFn: async () => {
      const res = await api.get<{ data: Thread[] }>(
        `/friendPs/${encodeURIComponent(username)}`
      );
      return res.data.data;
    },
    enabled: !!username,
  });
};
