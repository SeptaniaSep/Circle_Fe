import { useGetThreadsByAuthorId } from "@/components/hooks/useAuthGetThread";

export default function Media() {
  const { data, isLoading, error } = useGetThreadsByAuthorId();
  
  if (isLoading)
    return <p className="text-center  text-gray-200">Loading...</p>;
  if (error)
    return <p className="text-center text-gray-200">{error.message}</p>;
  if (!data || data.data.length === 0)
    return <p className="text-center text-gray-200">Belum ada media...</p>;


  return (
    <div className="grid grid-cols-3 gap-1 ">
      {data.data?.map((thread) => (
        <div
          key={thread.id}
          className="relative aspect-square overflow-hidden object-cover"
        >
          <img
            src={thread.image}
            className="absolute inset-0 w-full h-full"
            alt="media"
          />
        </div>
      ))}
    </div>
  );
}
