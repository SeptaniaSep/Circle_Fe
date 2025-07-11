import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useGetAllUser } from "@/components/hooks/useGetAllUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SugestedUser() {
  const navigate = useNavigate();
  const { data: sugges, isLoading, isError, error } = useGetAllUser();
  const displayedUsers = sugges?.data?.slice(0, 5) || [];

  if (isLoading) return <p className="text-center text-gray-200">Loading...</p>;
  if (isError) return <p className="text-center text-gray-200">{error.message}</p>;


  const handleFollowBadge = (username: string) => {
    console.log("Follow user:", username);
 
  };

  return (
    <div className="bg-[#333e35] p-4 rounded-lg mt-3">
      <h2 className="font-semibold text-white">Suggested for you</h2>

      <div className="grid">
        {displayedUsers.map((user: any) => (
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
                handleFollowBadge(user.username);
              }}
            >
              Follow
            </Badge>
          </div>
        ))}
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
