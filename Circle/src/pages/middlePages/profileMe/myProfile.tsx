import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  avatarInitial,
} from "@/components/ui/avatar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AvatarModal } from "@/components/features/avatarModal";
import { useGetProfile } from "@/components/hooks/useAuthProfile";
import { EditProfileModal } from "../editProfile";

export function MyProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.includes("/Media") ? "Media" : "AllPost";
  const { data: profile } = useGetProfile();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

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
        {profile?.data.banner && (
          <AspectRatio ratio={6 / 1}>
            <img
              src={profile?.data.banner}
              alt={avatarInitial(profile?.data.username)}
              className="rounded-2xl md:object-cover border-2 border-gray-900  w-full h-40"
            />
          </AspectRatio>
        )}
        <div>
          <div className="flex relative pl-4 pb-6">
            {/* Avatar yang bisa diklik */}
            {profile?.data.avatar && (
              <Avatar
                onClick={() => setIsModalOpen(true)}
                className="w-24 h-24 rounded-full border-2 border-gray-900 absolute -top-1"
              >
                <AvatarImage
                  src={profile?.data.avatar}
                  alt="avatar"
                  className="object-cover"
                />
                <AvatarFallback className="w-full h-full bg-[#0d120d] flex items-center justify-center text-white text-2xl">
                  {avatarInitial(profile?.data.username)}
                </AvatarFallback>
              </Avatar>
            )}
            {/* Modal avatar muncul saat diklik */}
            {profile?.data.avatar && (
              <AvatarModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                avatarUrl={profile?.data.avatar}
              />
            )}
          </div>
        </div>

        {/* BUTTON EDIT PROFILE */}
        <div className="mt-10 flex justify-end">
          <div>
            {/* Button buat buka modal edit */}
            <button
              className="px-4 py-1 border border-gray-500 rounded-full text-sm"
              onClick={() => setIsEditOpen(true)}
            >
              Edit Profile
            </button>

            {/* Modal Edit Profile */}
            <EditProfileModal
              open={isEditOpen}
              onClose={() => setIsEditOpen(false)}
              initialData={{
                username: profile?.data.username || "",
                fullname: profile?.data.fullname || "",
                bio: profile?.data.bio || "",
                avatar: profile?.data.avatar || null,
                banner: profile?.data.banner || null,
              }}
            />
          </div>
        </div>

        <div className="grid ml-4">
          <h1 className="text-xl font-semibold">{profile?.data.username}</h1>
          <p className="text-gray-400 font-sm">@{profile?.data.fullname}</p>
          <p className="text-sm">{profile?.data.bio}</p>
          <div className="flex text-sm text-gray-400 gap-4">
            <span
              onClick={() => navigate(`/follow/${profile?.data.id}/following`)}
              className="flex font-bold text-white gap-1 cursor-pointer"
            >
              {profile?.data.following ?? 0}
              <span className="font-light text-gray-400">Following</span>
            </span>
            <span
              onClick={() => navigate(`/follow/${profile?.data.id}/followers`)}
              className="flex font-bold text-white gap-1 cursor-pointer"
            >
              {profile?.data.followers ?? 0}
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
              activeTab === "AllPost"
                ? "border-b-2 border-green-400 text-green-500"
                : "text-gray-500"
            }`}
            onClick={() => navigate("AllPost")}
          >
            All Post
          </button>
          <button
            className={`flex-1 py-3 text-center ${
              activeTab === "Media"
                ? "border-b-2 border-green-400 text-green-500"
                : "text-gray-500"
            }`}
            onClick={() => navigate("Media")}
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
