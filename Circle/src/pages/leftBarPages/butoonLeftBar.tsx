import { CircleUserIcon, Home, UserRoundSearchIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { GoHeart } from "react-icons/go";
import { useGetProfile } from "@/components/hooks/useAuthProfile";

export function ButtonLeftBar() {
  const location = useLocation();
  const { data: profile } = useGetProfile();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const baseClass = "flex gap-4 items-center cursor-pointer";
  const activeClass = "text-green-600 font-semibold";
  const inactiveClass = "hover:text-gray-400 text-white";

  const userId = profile?.data?.id ?? "me";

  return (
    <div>
      <nav className="grid gap-8 pl-5">
        <Link
          to="/"
          className={`${baseClass} ${isActive("/") ? activeClass : inactiveClass}`}
        >
          <Home size={24} />
          Home
        </Link>

        <Link
          to="/search"
          className={`${baseClass} ${isActive("/search") ? activeClass : inactiveClass}`}
        >
          <UserRoundSearchIcon size={24} />
          Search
        </Link>

        <Link
          to={`/follow/${userId}/followers`}
          className={`${baseClass} ${isActive("/follow") ? activeClass : inactiveClass}`}
        >
          <GoHeart size={24} />
          Follow
        </Link>

        <Link
          to="/profile"
          className={`${baseClass} ${isActive("/profile") ? activeClass : inactiveClass}`}
        >
          <CircleUserIcon size={24} />
          Profile
        </Link>
      </nav>
    </div>
  );
}
