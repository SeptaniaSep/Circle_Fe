import { Footer } from "@/pages/rightBarPages/footerDev";
import { MyProfile } from "@/pages/rightBarPages/myProfile";
import { SugestedUser } from "@/pages/rightBarPages/sugested";
import { useLocation } from "react-router-dom";

function RightBar() {
  const location = useLocation();

  // kalo lagi buka profile sendiri MyProfile ilang kalo profile teman MYProfile ga ilang
  const isMyProfilePage =
    location.pathname === "/profile" ||
    location.pathname.startsWith("/profile/");

  return (
    <div className="grid text-white p-4  fixed">

      {/* My Profile */} 
      {!isMyProfilePage && (
        <div>
          <MyProfile />
        </div>
      )}

      {/* Suggested Users */}
      <div>
        <SugestedUser />
      </div>

      {/* Developer Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default RightBar;
