import { useParams } from "react-router-dom";
import { useFriendThreads } from "@/components/hooks/profileFriend/useAuthGetThreadFr";

export default function MediaFr() {
  const { username } = useParams<{ username: string }>();
  const { data: threads, isLoading, error } = useFriendThreads(username!);
  const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;

  if (isLoading)
    return <p className="text-center text-gray-200">Loading...</p>;
  if (error)
    return <p className="text-center text-gray-200">{error.message}</p>;

  // Filter hanya thread yang ada image-nya
  const threadsWithImages = threads?.filter((thread) => !!thread.image);

  if (!threadsWithImages || threadsWithImages.length === 0)
    return <p className="text-center text-gray-200">Belum ada media...</p>;

  return (
    <div className="grid grid-cols-3 gap-1">
      {threadsWithImages.map((thread) => (
        <div key={thread.id} className="relative aspect-square overflow-hidden">
          <img
            src={thread.image}
            className="absolute inset-0 w-full h-full object-cover"
            alt="media"
          />
        </div>
      ))}
    </div>
  );
}
