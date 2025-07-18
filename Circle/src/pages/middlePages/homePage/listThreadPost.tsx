import { useGetThreads } from "@/components/hooks/useAuthGetThread";
import { ThreadItem } from "./threadItems";
import type { typeThread } from "@/components/schemas/schemaAuthThread";

export function ListThreadPost() {
  const { data, isLoading, isError, error } = useGetThreads();

  if (isLoading) return <p className="text-center text-gray-200">Loading...</p>;
  if (isError) return <p className="text-center text-gray-200">{error.message}</p>;
  if (!data?.data || data.data.length === 0)
    return <p className="text-center text-gray-200">Belum ada post.</p>;

  return (
    <div>
      {data.data.map((thread: typeThread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
