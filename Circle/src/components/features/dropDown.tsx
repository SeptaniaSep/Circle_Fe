import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

export function DDMenu({ onEdit, onDelete }: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ddmenu" size="icon" >
          <MoreHorizontal size={30} className="text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="grid bg-[#464646aa]  gap-1 rounded-sm cursor-pointer ">
        <DropdownMenuItem onClick={onEdit} 
        className="py-2 px-6 text-center text-white hover:bg-[#1d241d] rounded-sm">
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} 
        className="py-2 px-6 text-center text-white hover:bg-[#1d241d] rounded-sm">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DDMenuDelet({ onDelete }: {
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ddmenu" size="icon" >
          <MoreHorizontal size={30} className="text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="grid bg-[#464646aa]  gap-1 rounded-sm cursor-pointer">
        <DropdownMenuItem onClick={onDelete} 
        className="py-2 px-6 text-center text-white hover:bg-[#1d241d] rounded-sm cursor-pointer">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}