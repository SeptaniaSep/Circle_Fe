import { useNavigate } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import { MessageSquareText } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  avatarInitial,
} from "@/components/ui/avatar";
import { useLike } from "@/components/features/like";
import type { typeThread } from "@/components/schemas/schemaAuthThread";

interface ThreadItemProps {
  thread: typeThread & {
    _count?: {
      replies?: number;
    };
  };
}

export function ThreadItem({ thread }: ThreadItemProps) {
  const navigate = useNavigate();
  const { likeCount, isLiked, isHovered, setIsHovered, handleLikeClick } =
    useLike(thread.id);

  const handleClick = () => {
    navigate(`/status/${thread.id}`);
  };

  return (
    <div
      className="border-t border-gray-500 p-4 hover:bg-[#141414aa] cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex gap-3 relative">
        {/* Avatar */}
        <Avatar>
          <AvatarImage
            className="rounded-full"
            src={thread.author.profile?.avatar || ""}
          />
          <AvatarFallback className="text-white text-sm border border-gray-600">
            {avatarInitial(thread.author.username)}
          </AvatarFallback>
        </Avatar>

        {/* Thread Content */}
        <div className="flex-1">
          <div className="flex gap-2 text-sm text-gray-600">
            <p className="font-semibold text-white">{thread.author.username}</p>
            <p className="text-gray-400">@{thread.author.profile?.fullname}</p>
            <span>· {new Date(thread.createdAt).toLocaleString()}</span>
          </div>

          <p className="text-white mt-1 text-sm">{thread.description}</p>

          {thread.image && (
            <div className="mt-2">
              <img
                src={thread.image}
                alt="image"
                className="rounded-md object-cover max-w-sm h-auto"
              />
            </div>
          )}

          <div className="flex gap-6 mt-3 text-gray-500 text-sm">
            {/* Like */}
            <div
              className="flex items-center gap-1"
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
            </div>

            {/* Replies */}
            {thread._count && (
              <div className="flex items-center gap-1">
                <MessageSquareText size={18} />
                <span>{thread._count?.replies ?? 0}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
