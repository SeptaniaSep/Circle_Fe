import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useGetAllUser } from "@/components/hooks/useGetAllUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";

export function SugestedUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: sugges, isLoading, isError, error } = useGetAllUser();
  const displayedUsers = sugges?.data?.slice(0, 5) || [];

  const [followStatus, setFollowStatus] = useState<Record<string, boolean>>({});

  const toggleFollowMutation = useMutation({
    mutationFn: async ({ userId, isFollowing }: { userId: string; isFollowing: boolean }) => {
      if (isFollowing) {
        await api.request({
          method: "DELETE",
          url: "/unfollow",
          data: { followingId: userId },
        });
      } else {
        await api.post("/follow", { followingId: userId });
      }
    },
    onSuccess: (_data, variables) => {
      setFollowStatus((prev) => ({
        ...prev,
        [variables.userId]: !variables.isFollowing,
      }));
      queryClient.invalidateQueries({ queryKey: ["getAllUser"] });
    },
  });

  const handleFollowBadge = (userId: string) => {
    const isFollowing = followStatus[userId] ?? false;
    toggleFollowMutation.mutate({ userId, isFollowing });
  };

  if (isLoading) return <p className="text-center text-gray-200">Loading...</p>;
  if (isError) return <p className="text-center text-gray-200">{error.message}</p>;

  return (
    <div className="bg-[#333e35] p-4 rounded-lg mt-3">
      <h2 className="font-semibold text-white">Suggested for you</h2>

      <div className="grid">
        {displayedUsers.map((user: any) => {
          const isFollowing = followStatus[user.id] ?? false;

          return (
            <div
              key={user.id}
              className="flex justify-between items-center hover:bg-[#39463c] py-2 px-2 rounded-md cursor-pointer"
              onClick={() => navigate(`/profileFr/${user.username}`)}
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8 rounded-full overflow-hidden border border-gray-700">
                  <AvatarImage
                    src={user?.profile?.avatar ?? ""}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                  <AvatarFallback className="w-full h-full flex items-center justify-center bg-muted text-white text-xs">
                    {user?.username?.[0]?.toUpperCase() ?? "?"}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-xs text-white">{user?.username ?? "unknown"}</p>
                  <p className="text-xs text-gray-500">
                    @{user?.profile?.fullname ?? "Unknown"}
                  </p>
                </div>
              </div>

              <Badge
                variant="outline"
                className="rounded-full px-2 text-xs text-amber border border-amber cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFollowBadge(user.id);
                }}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Badge>
            </div>
          );
        })}
      </div>

      {/* Tombol "See all" jika lebih dari 5 */}
      {Array.isArray(sugges?.data) && sugges.data.length > 5 && (
        <button
          onClick={() => navigate("/search")}
          className="text-xl text-amber hover:text-gray-300 mt-2"
        >
          See all
        </button>
      )}
    </div>
  );
}
