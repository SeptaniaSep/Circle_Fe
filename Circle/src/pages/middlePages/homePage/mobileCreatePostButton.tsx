import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import { FormPost } from "./formThreadPost"; // sesuaikan path

export function FloatingCreatePostButton() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {showForm && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex justify-center items-center md:hidden">
          <div className="bg-zinc-900 p-4 rounded-lg w-full max-w-xl">
            <FormPost />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 text-sm text-gray-500 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-15 right-6 z-30 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg md:hidden"
      >
        <SendHorizonal size={24} />
      </button>
    </>
  );
}
