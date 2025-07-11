import { useNavigate, useParams } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import { MessageSquareText } from "lucide-react";
import { useFriendThreads } from "@/components/hooks/profileFriend/useAuthGetThreadFr";
import { useLike } from "@/components/features/like";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  avatarInitial,
} from "@/components/ui/avatar";

export function AllPostFr() {
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  const { data: threads, isLoading: loadingThreads } = useFriendThreads(
    username!
  );

  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  const profileBaseUrl = import.meta.env.VITE_BACKEND_URL || "";

  if (loadingThreads)
    return <p className="text-center text-gray-200">Loading...</p>;

  if (!Array.isArray(threads))
    return <p className="text-center text-red-500">No threads found</p>;

  return (
    <div>
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          thread={thread}
          imageBaseUrl={imageBaseUrl}
          profileBaseUrl={profileBaseUrl}
          navigate={navigate}
        />
      ))}
    </div>
  );
}

function ThreadItem({
  thread,
  imageBaseUrl,
  profileBaseUrl,
  navigate,
}: {
  thread: any;
  imageBaseUrl: string;
  profileBaseUrl: string;
  navigate: ReturnType<typeof useNavigate>;
}) {
  const {
    id,
    description,
    image,
    _count,
    createdAt,
    author: {
      username,
      profile: { avatar, fullname },
    },
  } = thread;

  const { likeCount, isLiked, isHovered, setIsHovered, handleLikeClick } =
    useLike(_count.like);

  return (
    <div
      key={id}
      className="border-b border-gray-500 p-4 hover:bg-[#141414aa] cursor-pointer"
      onClick={() => navigate(`/status/${id}`)}
    >
      <div className="flex gap-3 relative">
        <Avatar>
          <AvatarImage className="rounded-full border" src={avatar} />
          <AvatarFallback className="w-full h-full flex items-center justify-center border border-gray-700 text-white text-sm">
            {avatarInitial(username)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1r">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <p className="font-semibold text-white">{username}</p>
            <p className="text-gray-400">@{fullname}</p>
            <span className="text-gray-600 text-xs">
              · {new Date(createdAt).toLocaleString()}
            </span>
          </div>

          <p className="text-white mt-1">{description}</p>

          {image && (
            <div className="mt-2">
              <img
                src={image}
                alt="image"
                className="rounded-md object-cover max-w-xs h-auto"
              />
            </div>
          )}

          <div className="flex gap-6 mt-3 text-gray-500 text-sm">
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

            <div className="flex items-center gap-1">
              <MessageSquareText size={18} />
              <span>{_count.replies} Replies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
