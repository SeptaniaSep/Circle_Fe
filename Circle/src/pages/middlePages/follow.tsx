import { Outlet, useLocation, useNavigate } from "react-router-dom";

export function Follow() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.includes("Followers")
    ? "Followers"
    : "Following";

  return (
    <div >
      <div className="flex mt-4 border-b border-gray-700 text-sm font-semibold">
        <button
        className={`flex-1 py-3 text-center ${
          activeTab === "Followers"
            ? "bg-green-600 border-b-2 text-white"
            : "text-gray-400"
        }`}
        onClick={() => navigate("Followers")}
      >
        Followers
      </button>

      <button
        className={`flex-1 py-3 text-center ${
          activeTab === "Following"
            ? "bg-green-600 border-b-2 text-white"
            : "text-gray-400"
        }`}
        onClick={() => navigate("Following")}
      >
        Following
      </button>
      </div>


      {/* Ini wajib untuk render komponen tab-nya */}
      <div className="mt-4">
        <Outlet />
      </div>

      <div>
        
      </div>
    </div>
  );
}
