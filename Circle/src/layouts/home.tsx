import { FormPost } from "@/pages/middlePages/homePage/formThreadPost";
import { ListThreadPost } from "@/pages/middlePages/homePage/listThreadPost";


export function Home() {
  return (
    <div className="flex-1  min-h-screen ">
      <h2 className="text-2xl font-bold m-6 text-white">Home</h2>

      <div>
        <FormPost />
      </div>

      <div>
        <ListThreadPost />
      </div>
    </div>
  );
}
