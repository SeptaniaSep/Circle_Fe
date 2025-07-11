import { useParams, useNavigate } from "react-router-dom";
import { FollowToggleButton } from "@/components/features/follow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetFollowingById, type FollowerUser } from "@/components/hooks/useAuthFollow";

export function Following() {
  const navigate = useNavigate();
  const { id } = useParams();
  const imageBaseUrl = import.meta.env.VITE_BACKEND_URL || "";

  const {
    data: following,
    isLoading,
    isError,
    error,
  } = useGetFollowingById(id || "");

  if (isLoading) {
    return <p className="text-center text-gray-400">Loading following...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-400">
        Error loading following: {error.message}
      </p>
    );
  }

  if (!following) return null;

  return (
    <div className="space-y-4 px-4 py-6 text-white">
      {following.length === 0 ? (
        <p className="text-center text-gray-400">No following found.</p>
      ) : (
        following.map((user: FollowerUser) => (
          <div
            key={user.id}
            className="flex items-center justify-between hover:bg-[#181d19] rounded-lg px-4 py-3"
          >
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 border border-gray-400">
                <AvatarImage
                  src={
                    user.avatar?.startsWith("http")
                      ? user.avatar
                      : `${imageBaseUrl}/${user.avatar}`
                  }
                  alt={user.username}
                />
                <AvatarFallback>
                  {user.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div
                onClick={() => navigate(`/profileFr/${user.username}`)}
                className="cursor-pointer"
              >
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-gray-400">@{user.fullname}</p>
                {user.bio && (
                  <p className="text-sm text-gray-300">{user.bio}</p>
                )}
              </div>
            </div>

            <FollowToggleButton user={user} />
          </div>
        ))
      )}
    </div>
  );
}
