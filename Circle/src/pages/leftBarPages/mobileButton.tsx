import { Home, Search, Heart, CircleUser } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useGetProfile } from "@/components/hooks/useAuthProfile";

export function MobileBottomBar() {
  const { data: profile } = useGetProfile();
  const userId = profile?.data?.id ?? "me";
  const location = useLocation();
  const pathname = location.pathname;

  const activeClass = "text-green-500";
  const inactiveClass = "text-white";

  return (
    <div className="fixed bottom-0 left-0 bg-[#0d120d] right-0 flex justify-around items-center py-2.5 z-50 md:hidden">
      <Link to="/" className={pathname === "/" ? activeClass : inactiveClass}>
        <Home size={26} />
      </Link>

      <Link
        to="/search"
        className={pathname.startsWith("/search") ? activeClass : inactiveClass}
      >
        <Search size={26} />
      </Link>

      <Link
        to={`/follow/${userId}/followers`}
        className={pathname.startsWith("/follow") ? activeClass : inactiveClass}
      >
        <Heart size={26} />
      </Link>

      <Link
        to="/profile"
        className={
          pathname.startsWith("/profile") ? activeClass : inactiveClass
        }
      >
        <CircleUser size={26} />
      </Link>
    </div>
  );
}
