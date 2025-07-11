import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  avatarInitial,
} from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus } from "lucide-react";
import { useState } from "react";
import { useGetProfile } from "@/components/hooks/useAuthProfile";
import { useCreateThread } from "@/components/hooks/useCreateThread";

export function CreatePost() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { mutate: createThread, isPending } = useCreateThread();
  const { data: profile } = useGetProfile();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handlePost = () => {
    if (!file && !text) {
      alert("Please write something or select an image");
      return;
    }

    const formData = new FormData();
    formData.append("description", text);
    if (file) formData.append("image", file);

    createThread(formData);

    // Reset semua
    setText("");
    setImagePreview(null);
    setFile(null);
    setOpen(false);
  };


  return (
    <>
      {/* Tombol Create Post */}
      <Button
        className="bg-green-600 rounded-2xl px-16 mt-5"
        onClick={() => setOpen(true)}
      >
        Create Post
      </Button>

      {/* Modal Post */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#1b221c] text-white border border-gray-700 shadow-2xl p-4 max-w-xl w-full rounded-xl">
          <div className="flex items-start gap-3">
            {profile?.data ? (
              <Avatar>
                {profile.data.avatar ? (
                  <AvatarImage
                    className="rounded-full"
                    src={profile.data.avatar}
                  />
                ) : null}
                <AvatarFallback className="w-full h-full flex items-center border justify-center text-white text-sm">
                  {avatarInitial(profile.data.username)}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse" />
            )}

            <div className="flex-1">
              <Textarea
                placeholder="What is happening?!"
                className="bg-transparent text-lg border-none resize-none min-h-[100px] placeholder:text-gray-500"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          </div>

          {/* Preview Gambar */}
          {imagePreview && (
            <div className="relative ml-14 mt-2">
              <img
                src={imagePreview}
                alt="preview"
                className="rounded-lg max-h-52 object-cover"
              />
              <button
                onClick={() => {
                  setImagePreview(null);
                  setFile(null);
                }}
                className="absolute top-2 right-2 hover:font-extrabold cursor-pointer text-white rounded-full px-3 text-sm bg-black/50"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex items-center border-t border-gray-500 justify-between mt-4 pt-4">
            <label htmlFor="upload-image" className="cursor-pointer">
              <ImagePlus className="size-6 text-green-500" />
              <input
                id="upload-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <Button
              className="rounded-full bg-green-600 text-white hover:bg-green-700 px-5"
              onClick={handlePost}
              disabled={isPending}
            >
              {isPending ? "Posting..." : "Post"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
