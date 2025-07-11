import { LogOut } from "lucide-react";
import { useLogout } from "@/components/hooks/useAuthLogout";

export function ButtonLogout() {
      const logout = useLogout()
    return (
       <div>
         {/* Tombol Logout */}
        <button
          onClick={logout}
          className="flex items-center mb-5 space-x-2 absolute bottom-4 left-3 hover:text-green-800 cursor-pointer"
        >
          <LogOut />
          <span>Logout</span>
        </button>
       </div>
    )
}