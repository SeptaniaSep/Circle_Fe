import { useGetReplies, useDeleteReply } from "@/components/hooks/useAuthReply";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  avatarInitial,
} from "@/components/ui/avatar";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DDMenuDelet } from "@/components/features/dropDown";

export function ReplayList({ parentId }: { parentId: string }) {
  const { data: replies, isLoading, refetch } = useGetReplies(parentId);
  const profileBaseUrl = import.meta.env.VITE_BACKEND_URL || "";

  const [openModal, setOpenModal] = useState(false);
  const [selectedReplyId, setSelectedReplyId] = useState<string | null>(null);
  const deleteReply = useDeleteReply();

  const handleDelete = () => {
    if (!selectedReplyId) return;
    deleteReply.mutate(selectedReplyId, {
      onSuccess: () => {
        setOpenModal(false);
        setSelectedReplyId(null);
        refetch();
      },
    });
  };

  if (isLoading) return <p className="text-gray-500 text-sm">Loading...</p>;

  return (
    <div className="mt-2 space-y-4">
      {replies?.map((item: any) => (
        <div
          key={item.id}
          className="flex gap-2 md:gap-3 p-4 md:p-8 border-b border-gray-800 relative"
        >
          <Avatar className="w-10 h-10">
            <AvatarImage src={item.author?.profile?.avatar} />
            <AvatarFallback className="text-white text-sm">
              {avatarInitial(item.author.username)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-wrap gap-1 items-center text-sm md:text-base">
              <p className="text-white font-semibold">
                {item.author.profile?.fullname || item.author.username}
              </p>
              <span className="text-gray-400 text-sm">@{item.author.username}</span>
              <p className="text-gray-700 text-sm">
                · {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>

            <p className="text-white mt-1 text-sm md:text-base break-words whitespace-pre-wrap">
              {item.description}
            </p>

            {item.image && (
              <img
                src={`${profileBaseUrl}/${item.image}`}
                alt="reply image"
                className="mt-2 rounded object-cover w-full max-w-[250px] md:max-w-xs h-auto"
              />
            )}
          </div>

          {/* Dropdown untuk Edit/Delete */}
          <div onClick={(e) => e.stopPropagation()}>
            <DDMenuDelet
              onDelete={() => {
                setSelectedReplyId(item.id);
                setOpenModal(true);
              }}
            />
          </div>
        </div>
      ))}

      {/* Modal konfirmasi delete */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="bg-[#1e1e1e] text-white border border-gray-700">
          <DialogHeader>
            <DialogTitle>Hapus Reply</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-300">
            Yakin ingin menghapus reply ini?
          </p>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpenModal(false)}>
              Batal
            </Button>
            <Button variant="outline" onClick={handleDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
