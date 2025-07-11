import { useNavigate } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import { MessageSquareText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, avatarInitial } from "@/components/ui/avatar";
import { useLike } from "@/components/features/like";
import type { typeThread } from "@/components/schemas/schemaAuthThread";

export function ThreadItem({ thread }: { thread: typeThread }) {
  const navigate = useNavigate();
  const {
    likeCount,
    isLiked,
    isHovered,
    setIsHovered,
    handleLikeClick,
  } = useLike(thread.id);

  const handleClick = () => {
    navigate(`/status/${thread.id}`);
  };

  return (
    <div
      className="border-t border-gray-500 p-4 hover:bg-[#141414aa] cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex gap-3 relative">
        {/* AVATAR */}
        <Avatar>
          <AvatarImage
            className="rounded-full"
            src={thread.author.profile?.avatar || ""}
          />
          <AvatarFallback className="w-full h-full flex items-center justify-center border border-gray-700 text-white text-sm">
            {avatarInitial(thread.author.username)}
          </AvatarFallback>
        </Avatar>

        {/* THREAD CONTENT */}
        <div className="grid">
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
            {/* LIKE */}
            <div
              className="flex items-center gap-1"
              onClick={(e) => {
                e.stopPropagation();
                handleLikeClick();
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered || isLiked ? <FcLike size={20} /> : <GoHeart size={20} />}
              <span>{likeCount}</span>
            </div>

            {/* REPLIES */}
            <div className="flex items-center gap-1">
              <MessageSquareText size={18} />
              <span>{thread._count?.replies ?? 0} Replies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
