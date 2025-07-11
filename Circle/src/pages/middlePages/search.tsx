import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LucideUserRoundSearch } from "lucide-react";
import { useGetAllUser } from "@/components/hooks/useGetAllUser";
import { FollowToggleButton } from "@/components/features/follow";
import { useNavigate } from "react-router-dom";

export function SearchPage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data: search, isLoading, isError, error } = useGetAllUser();
  const profileBaseUrl = import.meta.env.VITE_BACKEND_URL || "";

  const filteredUsers =
    search?.data?.filter(
      (user: any) =>
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user?.profile?.fullname?.toLowerCase()?.includes(query.toLowerCase())
    ) || [];

  if (isLoading) return <p className="text-center text-gray-200">Loading...</p>;
  if (isError)
    return <p className="text-center text-gray-200">{error.message}</p>;

  return (
    <div>
      <div className="search-bar sticky top-1 z-10 p-8 pb-0 bg-[#0d120d]">
        <div className="flex items-center bg-[#292d2a] pl-4 p-1 rounded-full ">
          <LucideUserRoundSearch className="text-gray-400" />
          <Input
            placeholder="Search your friend"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-white border-none rounded-full px-5 py-2 w-full"
          />
        </div>
      </div>
      <div className="flex-1 px-6 pt-8 text-white">
        {query && filteredUsers.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No results for “<strong>{query}</strong>”
            <br />
            Try searching for something else or check your spelling.
          </p>
        )}

        {filteredUsers.length > 0 && (
          <div className="space-y-4">
            {filteredUsers.map((user: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between hover:bg-[#181d19] rounded-lg px-4 py-3"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 border border-gray-400">
                    <AvatarImage
                      src={user.profile.avatar
                      }
                      alt={user.username}
                    />
                    <AvatarFallback>
                      {user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div onClick={() => navigate(`/profileFr/${user.username}`)}>
                    <p className="font-semibold text-white">{user?.username}</p>
                    <p className="text-sm text-gray-400">
                      @{user?.profile?.fullname || ""}
                    </p>
                    {user?.profile?.bio && (
                      <p className="text-sm text-gray-300">
                        {user.profile.bio}
                      </p>
                    )}
                  </div>
                </div>

                {/* 🔁 Button follow/unfollow */}
                <FollowToggleButton user={user} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
