import { Home, UserRoundSearch, CircleUser, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useGetProfile } from "@/components/hooks/useAuthProfile";

export function BottomNav() {
  const location = useLocation();
  const { data: profile } = useGetProfile();

  const isActive = (path: string) => location.pathname.startsWith(path);
  const userId = profile?.data?.id ?? "me";

  const baseClass = "flex flex-col items-center gap-1 text-xs";
  const active = "text-green-500";
  const inactive = "text-white hover:text-gray-400";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-gray-700 p-2 md:hidden">
      <div className="flex justify-around">
        <Link to="/" className={`${baseClass} ${isActive("/") ? active : inactive}`}>
          <Home size={20} />
          Home
        </Link>
        <Link to="/search" className={`${baseClass} ${isActive("/search") ? active : inactive}`}>
          <UserRoundSearch size={20} />
          Search
        </Link>
        <Link to={`/follow/${userId}/followers`} className={`${baseClass} ${isActive("/follow") ? active : inactive}`}>
          <Heart size={20} />
          Follow
        </Link>
        <Link to="/profile" className={`${baseClass} ${isActive("/profile") ? active : inactive}`}>
          <CircleUser size={20} />
          Profile
        </Link>
      </div>
    </nav>
  );
}
