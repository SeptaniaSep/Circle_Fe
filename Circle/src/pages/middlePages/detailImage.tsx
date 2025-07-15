import { useLocation} from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FcLike } from "react-icons/fc";
import { MessageSquareText } from "lucide-react";

export function ImageDetailPage() {
  const { state } = useLocation();
  // const navigate = useNavigate();

  const image = state?.image;
  const caption = state?.caption;
  const user = state?.user;

  const comments = [
    { user: "Selo Khan", text: "Sehat itu apa?" },
    { user: "Marta Bhak", text: "Kamu sehat gak..?" },
    { user: "Ngadenan", text: "Mager males grebek...." },
  ];

  if (!image) return <p className="text-center text-white">Image not found</p>;

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Left Image */}
      <div className="flex-1 flex justify-center items-center bg-black">
        <img
          src={image}
          alt="Preview"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Right Panel */}
      <div className="w-[400px] border-l border-gray-700 overflow-y-auto flex flex-col">
        {/* User Info */}
        <div className="p-4 pt-6 border-b border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarImage src={user?.profile?.avatar} alt={user?.username} />
              <AvatarFallback>
                {user?.username?.slice(0, 2).toUpperCase() || "US"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{user?.username}</p>
              <p className="text-sm text-gray-400">@{user?.profile?.fullname}</p>
            </div>
          </div>

          {/* Caption */}
          <p className="mb-6 text-sm text-gray-300">{caption}</p>

          {/* Actions */}
          <div className="flex gap-5 mt-3 ml-4 text-gray-400">
            <div className="flex items-center gap-1">
              <FcLike size={18} />
              <span>1</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquareText size={18} />
              <span>2</span>
            </div>
          </div>
        </div>

        {/* Reply Input */}
        <div className="flex items-start p-4 gap-3 border-b border-gray-800 py-4">
          <Avatar>
            <AvatarImage src={""} />
            <AvatarFallback className="w-full h-full flex items-center border justify-center text-white text-sm">
              CN
            </AvatarFallback>
          </Avatar>

          <form className="flex w-full gap-2.5 items-center">
            <textarea
              rows={1}
              className="w-full bg-transparent text-white p-2 text-sm focus:outline-none resize-none border border-gray-600 rounded-2xl"
              placeholder="Type your reply!"
            />
            <Button className="bg-green-600 text-white px-4 py-1 rounded-full text-sm">
              Reply
            </Button>
          </form>
        </div>

        {/* Comments */}
        {comments.map((c, i) => (
          <div key={i} className="gap-2 border-b border-gray-700 pb-2 p-4">
            <div className="flex gap-1">
              <Avatar>
                <AvatarImage src={""} />
                <AvatarFallback className="w-8 h-8 items-center justify-center text-white text-sm">
                  {c.user.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid">
                <div className="flex gap-1">
                  <p className="text-sm font-semibold">{c.user}</p>
                  <p className="text-sm text-gray-400">@....</p>
                  <span className="text-sm text-gray-500">· 1 hr</span>
                </div>
                <p className="text-sm text-gray-300">{c.text}</p>
              </div>
            </div>

            <div className="flex gap-5 mt-3 ml-10 text-gray-400">
              <div className="flex items-center gap-1">
                <FcLike size={18} />
                <span>1</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquareText size={18} />
                <span>2</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
