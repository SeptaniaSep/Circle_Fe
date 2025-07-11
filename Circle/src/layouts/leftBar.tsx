import { ButtonLeftBar } from "@/pages/leftBarPages/butoonLeftBar";
import { CreatePost } from "@/pages/leftBarPages/createPost";
import { ButtonLogout } from "@/pages/leftBarPages/logout";

export function LeftBar() {
  return (
    <div className="w-1/5 text-amber-50 p-2 pl-6 relative h-screen">
      <div>
        <h1 className="text-5xl mt-5 font-bold text-green-600 mb-8">Circle</h1>
      </div>
      <div>
        <ButtonLeftBar />
      </div>

      <div>
        <CreatePost />
      </div>

      <div>
        <ButtonLogout />
      </div>
    </div>
  );
}
