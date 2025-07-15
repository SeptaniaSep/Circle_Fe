import { useState } from "react";
import { Menu } from "lucide-react";
import { ListThreadPost } from "@/pages/middlePages/homePage/listThreadPost";
import { FloatingCreatePostButton } from "@/pages/middlePages/homePage/mobileCreatePostButton";
import { FormPost } from "@/pages/middlePages/homePage/formThreadPost";
import { MobileHomeDrawer } from "@/pages/middlePages/homePage/mobileHomeDrawer";


export function Home() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="flex-1 min-h-screen relative">
      {/* Header */}
      <div className="flex items-center gap-4 m-6">
        {/* Hamburger (mobile only) */}
        <button
          onClick={() => setOpenMenu(true)}
          className="text-white md:hidden"
        >
          <Menu size={28} />
        </button>
        <h2 className="text-2xl font-bold text-white">Home</h2>
      </div>

      {/* FormPost hanya desktop */}
      <div className="hidden md:block">
        <FormPost />
      </div>

      {/* Thread list */}
      <ListThreadPost />

      {/* Floating create post (mobile only) */}
      <FloatingCreatePostButton />

      {/* Hamburger menu drawer */}
      {openMenu && <MobileHomeDrawer onClose={() => setOpenMenu(false)} />}
    </div>
  );
}
