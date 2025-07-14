// src/pages/middlePages/postItem.tsx
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import { MessageSquareText } from "lucide-react";
import { useLike } from "@/components/features/like";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  avatarInitial,
} from "@/components/ui/avatar";
import { DDMenu } from "@/components/features/dropDown";
import { useNavigate } from "react-router-dom";
import type { typeThread } from "@/components/schemas/schemaAuthThread";

interface PostItemProps {
  thread: typeThread & { _count?: { replies: number } };
  onDelete: () => void;
}

export function PostItem({ thread, onDelete }: PostItemProps) {
  const navigate = useNavigate();
  const {
    likeCount,
    isLiked,
    isHovered,
    setIsHovered,
    handleLikeClick,
    isLoading,
  } = useLike(thread.id);

  return (
    <div
      className="border-b border-gray-500 p-4 hover:bg-[#141414aa] cursor-pointer"
      onClick={() => navigate(`/status/${thread.id}`)}
    >
      <div className="flex gap-3 relative">
        <Avatar>
          <AvatarImage
            className="rounded-full"
            src={thread.author.profile.avatar || ""}
          />
          <AvatarFallback className="text-gray-200">
            {avatarInitial(thread.author.username)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex gap-2 text-sm text-gray-600">
            <p className="font-semibold text-white">{thread.author.username}</p>
            <p className="text-gray-400">@{thread.author.profile.fullname}</p>
            <span>· {new Date(thread.createdAt).toLocaleString()}</span>
          </div>

          <p className="text-white text-sm mt-1">{thread.description}</p>

          {thread.image && (
            <div className="mt-2">
              <img
                src={thread.image}
                alt="image"
                className="rounded-md object-cover max-w-xs h-auto"
              />
            </div>
          )}

          <div className="flex gap-6 mt-3 text-gray-500 text-sm">
            <button
              className="flex items-center gap-1"
              disabled={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                handleLikeClick();
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered || isLiked ? (
                <FcLike size={20} />
              ) : (
                <GoHeart size={20} />
              )}
              <span>{likeCount}</span>
            </button>

            <div className="flex items-center gap-1">
              <MessageSquareText size={18} />
              <span>{thread._count?.replies ?? 0} </span>
            </div>
          </div>
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <DDMenu onEdit={() => {}} onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
}
