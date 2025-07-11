import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export type FollowResponse = {
  message: string;
  isFollowing: boolean;
};

export function useToggleFollow() {
  const queryClient = useQueryClient();

  const toggleFollow = async (followingId: string) : Promise<FollowResponse> => {
    const token = localStorage.getItem("token");
    const res = await api.post<FollowResponse>("/follow",
      { followingId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  };

  return useMutation({
    mutationFn: toggleFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] }); // refresh profile ku
      queryClient.invalidateQueries({ queryKey: ["users"] });    // refresh list user (search)
    },
  });
}
