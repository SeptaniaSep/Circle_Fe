import { Dialog, DialogContent } from "@/components/ui/dialog";

interface AvatarModalProps {
  open: boolean;
  onClose: () => void;
  avatarUrl?: string | "";
}

export function AvatarModal({ open, onClose, avatarUrl }: AvatarModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-transparent border-none flex justify-center items-center">
        <img
          src={avatarUrl}
          alt="Avatar"
          className="rounded-full max-w-[300px] max-h-[300px] object-cover"
        />
      </DialogContent>
    </Dialog>
  );
}
