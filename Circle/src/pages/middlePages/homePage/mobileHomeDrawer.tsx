import { CreatePost } from "@/pages/leftBarPages/createPost";
import { ButtonLogout } from "@/pages/leftBarPages/logout";
import { IoChevronBackOutline } from "react-icons/io5";

interface Props {
  onClose: () => void;
}

export function MobileHomeDrawer({ onClose }: Props) {
  return (
    <div className="fixed top-0 left-0 h-50 w-64 bg-[#0d120d] text-white z-50 p-4 md:hidden">
      <div className="flex justify-between items-center ">
        <button onClick={onClose}>
            <IoChevronBackOutline size={20}/>
        </button>
      </div>
      <div >
        <CreatePost />
        <ButtonLogout />
      </div>
    </div>
  );
}
