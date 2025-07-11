import { useEffect, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { useGetProfile } from "@/components/hooks/useAuthProfile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateProfile } from "@/components/hooks/useAuthEditProfile";
import { toast } from "sonner";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  initialData: {
    username: string;
    fullname: string;
    bio: string;
    avatar: string | null;
    banner: string | null;
  };
}

export function EditProfileModal({ open, onClose }: EditProfileModalProps) {
  const { data: profile } = useGetProfile();
  const { mutate, isPending } = useUpdateProfile();
  const profileBaseUrl = import.meta.env.VITE_BACKEND_URL || "";

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const [avatarPreview, setAvatarPreview] = useState<string>(
    "/default-avatar.png"
  );
  const [bannerPreview, setBannerPreview] = useState<string>(
    "/default-banner.jpg"
  );

  // Isi form dengan data awal saat modal dibuka
  useEffect(() => {
    if (open && profile?.data) {
      setUsername(profile.data.username || "");
      setFullname(profile.data.fullname || "");
      setBio(profile.data.bio || "");

      // setAvatarPreview(profile.data.avatar ?? "/default-avatar.png");
      // setBannerPreview(profile.data.banner ?? "/default-banner.jpg");

      setAvatarPreview(
        profile?.data.avatar
          ? profile?.data.avatar
          : "/default-avatar.png"
      );
      setBannerPreview(
        profile?.data.banner
          ? profile?.data.banner
          : "/default-banner.jpg"
      );

      setAvatarFile(null); // reset upload file
      setBannerFile(null);
    }
  }, [open, profile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    mutate(
      {
        username,
        fullname,
        bio,
        avatarFile,
        bannerFile,
      },
      {
        onSuccess: () => {
          toast.success("Profile updated!");
          onClose();
        },
        onError: () => {
          toast.error("Profile gagal di update!");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#1b221c] text-white">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {/* Banner Upload */}
          <div className="relative w-full h-40 mb-2">
            <img
              src={bannerPreview}
              alt="banner"
              className="w-full h-full object-cover rounded"
            />
            <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
              <IoCameraOutline className="text-black w-6 h-6 hover:w-8 hover:h-8" />
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Avatar Upload */}
          <div className="relative w-24 h-24 -mt-12 ml-4 bg-[#1a1a1a] rounded-full">
            <img
              src={avatarPreview}
              alt="avatar"
              className="w-full h-full object-cover rounded-full border-4 border-[#1a1a1a]"
            />
            <label className="absolute inset-0 flex items-center justify-center rounded-full cursor-pointer">
              <IoCameraOutline className="text-black w-6 h-6 hover:w-8 hover:h-8" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Input Fields */}
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-[#1a1a1a] text-white"
          />
          <Input
            placeholder="Fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="bg-[#1a1a1a] text-white"
          />
          <Textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="bg-[#1a1a1a] text-white"
          />

          <button
            onClick={handleSave}
            disabled={isPending}
            className="mt-2 w-20 bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded-full"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
