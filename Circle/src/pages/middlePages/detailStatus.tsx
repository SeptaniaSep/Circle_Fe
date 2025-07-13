import { useParams, useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  avatarInitial,
} from "@/components/ui/avatar";
import { MessageSquareText } from "lucide-react";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ReplayForm } from "./replayThreadForm";
import { useGetThreadByIdThread } from "@/components/hooks/useAuthGetThread";
import { useState } from "react";
import { ReplayList } from "./replayList";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DDMenu } from "@/components/features/dropDown";
import { useDeleteThread } from "@/components/hooks/useAuthDeleteThread";
import { useLike} from "@/components/features/like";

export function StatusPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deleteThread = useDeleteThread();

  const { data: thread, isLoading, isError } = useGetThreadByIdThread(id || "");

  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);


  const {
    likeCount,
    isLiked,
    handleLikeClick,
    isHovered,
    setIsHovered,
    isLoading: likeLoading,
  } = useLike(id || "");

  const handleDelete = () => {
    if (!selectedId) return;
    deleteThread.mutate(selectedId, {
      onSuccess: () => {
        setOpenModal(false);
        setSelectedId(null);
        navigate(-1);
      },
    });
  };

  if (isLoading) return <p className="text-white p-4">Loading...</p>;
  if (isError || !thread)
    return <p className="text-red-500 p-4">Thread not found</p>;
  if (!thread.author)
    return <p className="text-red-500">Author tidak ditemukan.</p>;

  return (
    <div className="flex flex-col flex-1 text-white min-h-screen">
      {/* Header */}
      <h1 className="flex gap-2 text-xl font-semibold items-center pt-5 pl-5">
        <FaArrowLeftLong
          size={20}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        Status
      </h1>

      {/* Thread Detail */}
      <div className="p-8 border-b border-gray-800">
        <div className="flex gap-3">
          {thread.author.profile?.avatar && (
            <Avatar>
              <AvatarImage src={thread.author.profile.avatar} />
              <AvatarFallback className="w-full h-full flex items-center justify-center border border-gray-700 text-white text-sm">
                {avatarInitial(thread.author.username)}
              </AvatarFallback>
            </Avatar>
          )}

          <div className="flex-1">
            <div className="flex gap-2 items-center">
              <h4 className="font-bold text-white">{thread.author.username}</h4>
              <span className="text-gray-400 text-sm">
                @{thread.author.profile?.fullname} ·{" "}
                {new Date(thread.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="text-white mt-2 text-sm">{thread.description}</p>

            {thread.image && (
              <div className="mt-2">
                <img
                  src={thread.image}
                  className="rounded-md object-cover max-w-sm h-auto"
                  alt="thread-img"
                />
              </div>
            )}

            {/* Like & Reply Info */}
            <div className="flex gap-5 mt-4 text-gray-400">
              <div
                className={`flex gap-1 items-center cursor-pointer ${
                  isLiked ? "text-gray-500" : "text-gray-400"
                }`}
                onClick={handleLikeClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {isLiked || isHovered ? (
                  <FcLike size={20} />
                ) : (
                  <GoHeart size={20} />
                )}
                <span>{likeCount}</span>
              </div>

              <div className="flex gap-1 items-center">
                <MessageSquareText size={18} />
              </div>
            </div>
          </div>

          {/* Dropdown untuk hapus thread utama */}
          <div onClick={(e) => e.stopPropagation()}>
            <DDMenu
              onEdit={() => console.log("Edit thread")}
              onDelete={() => {
                setSelectedId(thread.id);
                setOpenModal(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* Reply Form */}
      <ReplayForm parentId={thread.id} />

      {/* Reply List */}
      <ReplayList parentId={thread.id} />

      {/* Confirm Delete Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="bg-[#1e1e1e] text-white border border-gray-700">
          <DialogHeader>
            <DialogTitle>Hapus Postingan</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-300">
            Yakin ingin menghapus postingan ini?
          </p>
          <DialogFooter className="mt-4">
            <Button variant="ghost" onClick={() => setOpenModal(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
