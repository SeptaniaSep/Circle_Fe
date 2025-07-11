import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export interface UpdateProfilePayload {
  username: string;
  fullname: string;
  bio: string;
  avatarFile?: File | null;
  bannerFile?: File | null;
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateProfilePayload) => {
      const formData = new FormData();

      formData.append("username", data.username);
      formData.append("fullname", data.fullname);
      formData.append("bio", data.bio);

      if (data.avatarFile) {
        formData.append("avatar", data.avatarFile);
      }

      if (data.bannerFile) {
        formData.append("banner", data.bannerFile);
      }

      const res = await api.patch("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      return res.data;
    },
    onSuccess: () => 
      queryClient.invalidateQueries({ queryKey: ["profile"] })
  });

  return mutation;
}
