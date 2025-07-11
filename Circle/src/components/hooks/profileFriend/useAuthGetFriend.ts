import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface UserProfile {
  id: string;
  username: string;
  profile: {
    fullname: string | null | undefined;
    avatar: string | null | undefined;
    banner: string | null | undefined;
    bio: string | null | undefined;
  } | null | undefined;
  followers: number;
  following: number;
  isFollowed?: boolean; 
}

interface GetProfileResponse {
  data: UserProfile;
}

export function useGetProfileFoll(username: string) {
  return useQuery<GetProfileResponse>({
    queryKey: ["friendProfile", username],
    queryFn: async () => {
      const res = await api.get<GetProfileResponse>(`/friend/${username}`);
      return res.data;
    },
    enabled: !!username,
  });
}