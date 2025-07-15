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
import { useGetThreadByIdThread } from "@/components/hooks/useAuthGetThread";
import { useState } from "react";
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
import { useLike } from "@/components/features/like";
import { ReplayList } from "../detailStatus/replayList";
import { ReplayForm } from "../detailStatus/replayThreadForm";

export function StatusPageMe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deleteThread = useDeleteThread();
  const { data: thread, isLoading, isError } = useGetThreadByIdThread(id || "");

  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { likeCount, isLiked, handleLikeClick, isHovered, setIsHovered } =
    useLike(id || "");

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
      <h1 className="flex gap-2 text-lg md:text-xl font-semibold items-center pt-4 pl-4 md:pt-5 md:pl-5">
        <FaArrowLeftLong
          size={20}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        Status
      </h1>

      {/* Thread Detail */}
      <div className="p-4 md:p-8 border-b border-gray-800">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={thread.author.profile?.avatar || ""} />
            <AvatarFallback className="w-full h-full flex items-center justify-center border border-gray-700 text-white text-sm">
              {avatarInitial(thread.author.username)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-wrap gap-1 items-center text-sm md:text-base">
              <h4 className="font-bold text-white">{thread.author.username}</h4>
              <span className="text-gray-400 truncate">
                @{thread.author.profile?.fullname} ·{" "}
                {new Date(thread.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Description */}
            <p className="text-white mt-2 text-sm md:text-base whitespace-pre-wrap break-words">
              {thread.description}
            </p>

            {/* Image */}
            {thread.image && (
              <div className="mt-2">
                <img
                  src={thread.image}
                  className="rounded-md object-cover w-full max-w-xs md:max-w-sm max-h-[300px]"
                  alt="thread-img"
                />
              </div>
            )}

            {/* Like & Reply Info */}
            <div className="flex gap-5 mt-3 md:mt-4 text-gray-400 text-sm md:text-base">
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

              {thread._count && (
                <div className="flex gap-1 items-center">
                  <MessageSquareText size={18} />
                  {thread._count.replies ?? 0}
                </div>
              )}
            </div>
          </div>

          {/* Dropdown for delete */}
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
