import { FaArrowLeftLong } from "react-icons/fa6";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  avatarInitial,
} from "@/components/ui/avatar";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { AvatarModal } from "@/components/features/avatarModal";
import { useState } from "react";
import { useGetProfileFoll } from "@/components/hooks/profileFriend/useAuthGetFriend";

export function ProfileFrPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.includes("/MediaFr")
    ? "MediaFr"
    : "AllPostFr";
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Friend
  const { username } = useParams<{ username: string }>();
  const { data: friend, isLoading } = useGetProfileFoll(username!);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mx-auto text-white min-h-screen">
      <h1 className="flex gap-2 text-xl font-semibold items-center pt-5 pl-5">
        <FaArrowLeftLong
          size={20}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        Profile
      </h1>

      {/* Header & Profile */}
      <div className="m-6">
        <AspectRatio ratio={6 / 1}>
          <img
            src={friend?.data.profile?.banner}
            alt="BgImage"
            className="rounded-2xl md:object-cover border-2 border-gray-900 w-full h-40"
          />
        </AspectRatio>

        <div>
          <div className="flex relative pl-4 pb-6">
            {/* Avatar yang bisa diklik */}
            <Avatar
              onClick={() => setIsModalOpen(true)}
              className="w-24 h-24 rounded-full border-2 border-gray-900 absolute -top-1"
            >
              <AvatarImage
                src={friend?.data.profile?.avatar}
                alt="avatar"
                className="object-cover"
              />
              <AvatarFallback className="w-full h-full bg-[#0d120d] flex items-center justify-center text-white text-2xl">
                {avatarInitial(friend?.data.username)}
              </AvatarFallback>
            </Avatar>

            {/* Modal avatar muncul saat diklik */}

            <AvatarModal
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              avatarUrl={friend?.data.profile?.avatar ?? ""}
            />
          </div>
        </div>
        <div className="grid ml-4 mt-20">
          <h1 className="text-xl font-semibold">{friend?.data.username}</h1>
          <p className="text-gray-400 font-sm">
            @{friend?.data.profile?.fullname}
          </p>
          <p className="text-sm">{friend?.data.profile?.bio}</p>
          <div className="flex text-sm text-gray-400 gap-4">
            <span className="flex font-bold text-white gap-1">
              {friend?.data.following ?? 0}
              <span className="font-light text-gray-400">Following</span>
            </span>
            <span className=" flex font-bold text-white gap-1">
              {friend?.data.followers ?? 0}
              <span className="font-light text-gray-400">Followers</span>
            </span>
          </div>
        </div>
      </div>

      {/* Profile detail component */}
      <div>
        <div className="flex mt-4 border-b border-gray-700 text-sm font-semibold">
          <button
            className={`flex-1 py-3 text-center ${
              activeTab === "AllPostFr"
                ? "border-b-2 border-green-400 text-green-500"
                : "text-gray-500"
            }`}
            onClick={() => navigate("AllPostFr")}
          >
            All Post
          </button>
          <button
            className={`flex-1 py-3 text-center ${
              activeTab === "MediaFr"
                ? "border-b-2 border-green-400 text-green-500"
                : "text-gray-500"
            }`}
            onClick={() => navigate("MediaFr")}
          >
            Media
          </button>
        </div>

        {/* Ini wajib untuk render komponen tab-nya */}
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
