import { useState } from "react";
import { Button } from "../ui/button";
import { useToggleFollow } from "../hooks/useToogleFollow";
import { useGetProfile } from "../hooks/useAuthProfile";

export function FollowToggleButton({ user }: { user: any }) {
  const { mutate: toggleFollow, isPending } = useToggleFollow();
  const [isFollowing, setIsFollowing] = useState(user.isFollowed); 
  const { refetch } = useGetProfile();

  const handleToggle = () => {
    toggleFollow(user.id, {
      onSuccess: (res) => {
        setIsFollowing(res.isFollowing);
         refetch();
      },
    });
  };

  return (
    <Button
      onClick={handleToggle}
      disabled={isPending}
      variant={isFollowing ? "outline" : "default"}
      className="rounded-full border border-white text-white px-4 py-1"
    >
      {isPending ? "..." : isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
