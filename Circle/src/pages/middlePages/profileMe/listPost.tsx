// src/pages/middlePages/ListPost.tsx
import { useNavigate } from "react-router-dom";
import { useGetThreads } from "@/components/hooks/useAuthGetThread";
import { PostItem } from "./postItem";

export function ListPost() {
  const { data, isLoading, isError, error } = useGetThreads();
  const navigate = useNavigate();

  if (isLoading) return <p className="text-center text-gray-200">Loading...</p>;
  if (isError) return <p className="text-center text-gray-200">{error.message}</p>;
  if (!data || data.data.length === 0)
    return <p className="text-center text-gray-200">Belum ada post.</p>;

  return (
    <div>
      {data.data.map((thread) => (
        <PostItem
          key={thread.id}
          thread={thread}
          onDelete={() => navigate("/profile")}
        />
      ))}
    </div>
  );
}
