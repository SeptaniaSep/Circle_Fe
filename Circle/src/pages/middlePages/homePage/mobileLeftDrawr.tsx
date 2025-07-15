import { ButtonLogout } from "@/pages/leftBarPages/logout";
import { CreatePost } from "@/pages/leftBarPages/createPost";
import { X } from "lucide-react";

interface Props {
  onClose: () => void;
}

export function LeftDrawerMenu({ onClose }: Props) {
  return (
    <div className="fixed top-0 left-0 w-64 h-full bg-black text-white z-50 shadow-xl flex flex-col md:hidden">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <CreatePost />
        <ButtonLogout />
      </div>
    </div>
  );
}
