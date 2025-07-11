import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useGetAllUser } from "@/components/hooks/useGetAllUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SugestedUser() {
  const navigate = useNavigate();
  const { data: sugges, isLoading, isError, error } = useGetAllUser();
  const profileBaseUrl = import.meta.env.VITE_BACKEND_URL || "";
  const displayedUsers = sugges?.data?.slice(0, 5) || []; // Tampilkan maksimal 5 user
  const handleFollowBadge = (index: number) => {
    // optional if you want local follow toggle
  };

  if (isLoading) return <p className="text-center text-gray-200">Loading...</p>;
  if (isError)
    return <p className="text-center text-gray-200">{error.message}</p>;

  

  return (
    <div className="bg-[#333e35] p-4 rounded-lg mt-3">
      <h2 className="font-semibold text-white">Suggested for you</h2>

      <div className="grid">
        {displayedUsers.map((user: any, index: number) => (
          <div
            key={index}
            className="flex justify-between items-center hover:bg-[#39463c] py-1 px- rounded-md"
            onClick={() => navigate(`/profileFr/${user.username}`)}
          >
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8 rounded-full overflow-hidden border border-gray-700">
                <AvatarImage
                  src={user?.profile?.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
                <AvatarFallback className="w-full h-full flex items-center justify-center bg-muted text-white text-xs">
                  {user?.username?.[0] || "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs text-white">{user?.username}</p>
                <p className="text-xs text-gray-500">
                  @{user?.profile?.fullname || "unknown"}
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="rounded-full px-2 text-xs text-amber border border-amber cursor-pointer"
              onClick={() => handleFollowBadge(index)}
            >
              Follow
            </Badge>
          </div>
        ))}
      </div>

      {/* Tombol "See all" jika lebih dari 5 */}
      {/* {Array.isArray(sugges?.data) && sugges.data.length > 5 && (
        <button
          onClick={() => navigate("/search")}
          className="text-xl text-amber hover:text-gray-300"
        >
          ...
        </button>
      )} */}
    </div>
  );
}
