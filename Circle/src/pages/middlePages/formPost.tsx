import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  avatarInitial,
} from "@/components/ui/avatar";
import { ImagePlus } from "lucide-react";
import { useCreateThread } from "@/components/hooks/useCreateThread";
import type React from "react";
import { useState } from "react";
import { useGetProfile } from "@/components/hooks/useAuthProfile";

export function FormPost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { mutate: createThread, isPending } = useCreateThread();
  const { data: profile } = useGetProfile();
  const profileBaseUrl = import.meta.env.VITE_BACKEND_URL || "";

  const handlePost = () => {
    if (!text.trim()) {
      alert("Please write something");
      return;
    }

    const formData = new FormData();
    formData.append("description", text);
    if (file) {
      formData.append("image", file);
    }

    createThread(formData);
    setText("");
    setImage(null);
    setFile(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div>
      <div className="flex p-4 rounded-lg mt-4 mb-4 gap-2 items-center">
        {profile?.data ? (
          <Avatar>
            {profile.data.avatar ? (
              <AvatarImage className="rounded-full" src={profile.data.avatar} />
            ) : null}
            <AvatarFallback className="w-full h-full flex items-center border justify-center text-white text-sm">
              {avatarInitial(profile.data.username)}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse" />
        )}

        <Input
          className="w-full p-3 rounded-lg border-none text-white"
          placeholder="What's happening?!"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Upload Gambar */}
        <label htmlFor="file-upload">
          <ImagePlus size={25} className="text-green-600 cursor-pointer" />
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        <Button
          onClick={handlePost}
          disabled={isPending}
          className="mt-1 bg-green-600 text-white px-3 py-1.5 rounded-4xl"
        >
          {isPending ? "Posting..." : "Post"}
        </Button>
      </div>

      {/* Preview Gambar */}
      {image && (
        <div className="relative ml-20 mb-6 w-fit">
          <img
            src={image}
            alt="preview"
            className="rounded-lg max-h-52 object-cover"
          />
          <button
            onClick={() => {
              setImage(null);
              setFile(null);
            }}
            className="absolute top-2 -right-2 hover:font-extrabold cursor-pointer text-white rounded-full px-5 text-sm"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
