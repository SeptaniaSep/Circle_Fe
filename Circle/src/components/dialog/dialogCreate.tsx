import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ImagePlus } from "lucide-react";

function CreateDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="items-center basis-128 bg-green-500 m-5 p-3 w-50 rounded-3xl">
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-950 border-0 text-gray-400">
        <div>
          <Input
            className="border-0 "
            id="content"
            placeholder="What is Happening?"
          />
        </div>
        <DialogFooter>
          <div className="flex gap-90">
            <ImagePlus className="text-green-500" />

            <Button
              type="submit"
              className="cursor-pointer bg-green-500 rounded-4xl text-gray-100"
            >
              Create
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateDialog;