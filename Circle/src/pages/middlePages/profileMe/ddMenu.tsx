import { useGetThreadsByAuthorId } from "@/components/hooks/useAuthGetThread";
import { useDeleteThread } from "@/components/hooks/useAuthDeleteThread";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { PostItem } from "./postItem";

export function AllPost() {
  const { data, isLoading, error, refetch } = useGetThreadsByAuthorId();
  const deleteThread = useDeleteThread();

  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDelete = () => {
    if (!selectedId) return;
    deleteThread.mutate(selectedId, {
      onSuccess: () => {
        setOpenModal(false);
        setSelectedId(null);
        refetch();
      },
    });
  };

  if (isLoading) return <p className="text-center text-gray-200">Loading...</p>;
  if (error) return <p className="text-center text-gray-200">{error.message}</p>;
  if (!data || data.data.length === 0) return <p className="text-center text-gray-200">Belum ada post.</p>;

  return (
    <>
      <div>
        {data.data.map((thread: any) => (
          <PostItem
            key={thread.id}
            thread={thread}
            onDelete={() => {
              setSelectedId(thread.id);
              setOpenModal(true);
            }}
          />
        ))}
      </div>

      {/* Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="bg-[#1e1e1e] text-white border border-gray-700">
          <DialogHeader>
            <DialogTitle>Hapus Thread</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-300">Yakin ingin menghapus thread ini?</p>
          <DialogFooter className="mt-4">
            <Button variant="ghost" onClick={() => setOpenModal(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
