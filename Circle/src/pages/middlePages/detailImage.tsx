import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FcLike } from "react-icons/fc";
import { MessageSquareText } from "lucide-react";

export function ImageDetailPage() {
  const [comment, setComment] = useState("");
  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  const username = "Drinks Archive";
  const fullname = "drinksarchive.in";
  const caption =
    "Salah satu penyegar mulut dan tubuh, bisa dijadikan minuman pembuka atau penutup. Rasanya super fresh ✨";
  const comments = [
    { user: "Selo Khan", text: "Sehat itu apa?" },
    { user: "Marta Bhak", text: "Kamu sehat gak..?" },
    {
      user: "Ngadenan",
      text: "Mager males grebek....",
    },
  ];

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Left Image */}
      <div className="flex-1 flex justify-center items-center bg-black">
        <img
          src={imageBaseUrl}
          alt="Preview"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* == Right Panel == */}
      <div className="w-[400px] border-l border-gray-700  overflow-y-auto flex flex-col">
        {/* User Info */}
        <div className="p-4 pt-6 border-b border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarImage src="/default-avatar.png" alt={username} />
              <AvatarFallback className="w-full h-full flex items-center border boeder-gray-700 justify-center text-white text-sm">
                {username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{username}</p>
              <p className="text-sm text-gray-400">@{fullname}</p>
            </div>
          </div>

          {/* Caption */}
          <p className="mb-6 text-sm text-gray-300">{caption}</p>

          {/* Aksi like / reply count */}
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

        {/* == Reply Form == */}
        <div className="flex w-auto items-start p-4 gap-3 border-b border-gray-800 py-4 ">
          {/* Reply Input */}

          <Avatar>
            <AvatarImage src={""} />
            <AvatarFallback className="w-full h-full flex items-center border boeder-gray-700 justify-center text-white text-sm">
              CN
            </AvatarFallback>
          </Avatar>

          <form
            // onSubmit={""}
            className="flex w-full gap-2.5 items-center"
          >
            <textarea
              rows={1}
              className="w-full max-w-xl bg-transparent text-white p-2 text-sm  focus:outline-none resize-none overflow-hidden border border-gray-600 rounded-2xl"
              placeholder="Type your reply!"
              //   value={}
            />
            <div className="flex gap-2 items-center">
              {/* <ImagePlus size={25} className=" text-green-600" /> */}
              <Button className="bg-green-600 text-white px-4 py-1 rounded-full text-sm">
                {/* {isPending ? "Replying..." : "Reply"} */} Reply
              </Button>
            </div>
          </form>
        </div>

        {/* == Comments List == */}

        {comments.map((c, i) => (
          <div className="gap-2 border-b border-gray-700 pb-2 p-4 " key={i}>
            <div className="flex gap-1">
              <Avatar>
                <AvatarImage src={""} />
                <AvatarFallback className="w-8 h-8 items-center border boeder-gray-700 justify-center text-white text-sm">
                  CN
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

            {/* Aksi like / reply count */}
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
