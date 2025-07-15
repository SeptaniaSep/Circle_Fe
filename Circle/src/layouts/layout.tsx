import { Outlet } from "react-router-dom";
import { LeftBar } from "./leftBar";
import RightBar from "./rightBar";
import { MobileBottomBar } from "@/pages/leftBarPages/mobileButton";


export function Layout() {
  return (
    <div className="relative h-screen w-screen flex flex-col md:flex-row overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-[270px] border-r border-gray-700 shrink-0 p-4 overflow-hidden">
        <LeftBar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-[830px] border-r border-gray-700 overflow-y-auto scrollbar-hide">
        <Outlet />
      </main>

      {/* RightBar (desktop only) */}
      <aside className="hidden md:block w-[400px] shrink-0 overflow-hidden">
        <RightBar />
      </aside>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden">
        <MobileBottomBar />
      </div>
    </div>
  );
}
