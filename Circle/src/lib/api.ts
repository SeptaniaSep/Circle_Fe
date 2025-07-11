import axios from "axios";
import Cookies from "js-cookie";



// ===CREATE=== //
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});


api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error", error);
    return Promise.reject(error);
  }

  
);

// // ===GET=== //
// export async function getAllThreads(): Promise<listPostType[]> {
//   const res = await axios.get<{ data: listPostType[] }>("/thread");
//   return res.data.data;
// }