import { useState } from "react";
import { ButtonLeftBar } from "@/pages/leftBarPages/butoonLeftBar";
import { CreatePost } from "@/pages/leftBarPages/createPost";
import { ButtonLogout } from "@/pages/leftBarPages/logout";
import { Menu } from "lucide-react";
import { LeftDrawerMenu } from "@/pages/middlePages/homePage/mobileLeftDrawr";

export function LeftBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-1/5 text-amber-50 p-2 pl-6 relative h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-5xl mt-5 font-bold text-green-600 mb-8">Circle</h1>

        {/* Hamburger hanya untuk mobile */}
        <button
          onClick={() => setMenuOpen(true)}
          className="text-white mt-5 mr-4 md:hidden"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Menu navigasi utama */}
      <div>
        <ButtonLeftBar />
      </div>

      {/* ✅ Khusus desktop: Tampilkan CreatePost & Logout */}
      <div className="hidden md:block mt-8 space-y-4">
        <CreatePost />
        <ButtonLogout />
      </div>

      {/* ✅ Khusus mobile: drawer menu */}
      {menuOpen && <LeftDrawerMenu onClose={() => setMenuOpen(false)} />}
    </div>
  );
}
