import { useQuery } from "@tanstack/react-query";
import type { GetAllUserTypeArray } from "../schemas/schemaAuthProfile";
import Cookies from "js-cookie";
import { api } from "@/lib/api";

export function useGetAllUser() {
    return useQuery<GetAllUserTypeArray, Error> ({
        queryKey: ["search"],
        queryFn: async () => {
            const token = Cookies.get("token")
            if (!token) {
                throw new Error("Token tidak di temukan. Harap login")
            }

            const res = await api.get<GetAllUserTypeArray>("/search", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            return res.data
        }
    })
}