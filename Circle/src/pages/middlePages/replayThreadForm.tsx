import { useCreateReply } from "@/components/hooks/useAuthReply";
import { useGetProfile } from "@/components/hooks/useAuthProfile";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  avatarInitial,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Props {
  parentId: string;
}

export function ReplayForm({ parentId }: Props) {
  const { data: replay } = useGetProfile();
  const { mutate: reply, isPending } = useCreateReply(parentId);
  const [text, setText] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    reply(
      { description: text, image: null },
      {
        onSuccess: () => setText(""),
      }
    );
  };

  return (
    <div className="flex w-auto items-start p-8 gap-3 border-b border-gray-800 py-4">
      {/* Reply Input */}

      {replay?.data.avatar && (
        <Avatar>
          <AvatarImage src={replay?.data.avatar}/>
          <AvatarFallback className="w-full h-full flex items-center border boeder-gray-700 justify-center text-white text-sm">
            {avatarInitial(replay?.data.username)}
          </AvatarFallback>
        </Avatar>
      )}
      <form onSubmit={handleSubmit} className="flex w-full gap-2.5 items-center">
        <textarea
          rows={1}
          className="w-full max-w-xl bg-transparent text-white p-2 text-sm  focus:outline-none resize-none overflow-hidden border border-gray-600 rounded-2xl"
          placeholder="Type your reply!"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex gap-2 items-center">
          

          {/* <ImagePlus size={25} className=" text-green-600" /> */}
          <Button className="bg-green-600 text-white px-4 py-1 rounded-full text-sm">
            {isPending ? "Replying..." : "Reply"}
          </Button>
        </div>
      </form>
    </div>
  );
}
