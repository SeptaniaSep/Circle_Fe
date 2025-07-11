import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "@/components/hooks/useAuthProfile";
import { avatarInitial } from "@/components/ui/avatar";

export function MyProfile() {
  const navigate = useNavigate();
  const { data: profile } = useGetProfile();
  const profileData = profile?.data;

  if (!profileData) {
    return <p className="text-gray-400">Loading profile...</p>;
  }

  return (
    <div>
      {/* Profile Section */}
      <div
        className="bg-[#333e35] p-4 rounded-lg"
        onClick={() => navigate("/profile")}
      >
        <h2 className="text-xl font-bold pb-2">My Profile</h2>

        {/* Banner */}
        {profileData.banner && (
          <AspectRatio ratio={6 / 1} className="relative">
            <img
              src={profileData.banner}
              alt={avatarInitial(profileData.username)}
              className="rounded-xl md:object-cover w-full h-20 border border-gray-700"
            />
          </AspectRatio>
        )}

        {/* Avatar & Edit Button */}
        <div className="flex relative justify-between items-center px-4">
          <Avatar className="w-15 h-15 rounded-full overflow-hidden border border-gray-700">
            {profileData.avatar ? (
              <AvatarImage
                className="rounded-full size-15"
                src={profileData.avatar}
              />
            ) : (
              <AvatarFallback className="w-full h-full flex items-center justify-center bg-[#333e35] text-white text-xl">
                {avatarInitial(profileData.username)}
              </AvatarFallback>
            )}
          </Avatar>

          <Badge variant="outline" className="mt-8 rounded-2xl">
            Edit Profile
          </Badge>
        </div>

        {/* User Info */}
        <div className="grid m-1">
          <p>{profileData.username}</p>
          <p className="text-gray-500 text-xs">@{profileData.fullname}</p>
          <p className="text-sm">{profileData.bio}</p>
          <div className="flex text-sm gap-5">
            <p className="text-gray-500">
              <span className="font-bold text-white">
                {profileData.following ?? 0}
              </span>{" "}
              Following
            </p>
            <p className="text-gray-500">
              <span className="font-bold text-white">
                {profileData.followers ?? 0}
              </span>{" "}
              Followers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
