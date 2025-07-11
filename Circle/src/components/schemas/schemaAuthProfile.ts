import { z } from "zod";

export const schemaAuthProfile = z.object({
  username: z.string().min(3, "Username minimal 3 karakter"),
  fullname: z.string().min(5, "Username minimal 5 karakter"),
  avatar: z.string().optional(),
  banner: z.string().optional(),
  bio: z.string().optional(),
});

export type schemaAutProfileDTO = z.infer<typeof schemaAuthProfile>;

export interface typeProfile {
  id: string
  avatar: string;
  banner: string;
  bio: string;
  fullname: string;
  username: string;
  followers: number;
  following: number;
   isFollowed?: boolean;
}

export interface typeProfilePayload {
  message: string;
  data: typeProfile;
}


export interface GetAllUserTypeArray  {
  message: string;
  data: typeProfile[]; 
};
