import z from "zod";
import type { typeProfile } from "./schemaAuthProfile";


export const schemaAuthThread = z.object({
  description: z.string().min(1, "Tidak boleh kosong!"),
  image: z.string().nullable(), // gambar bisa null
});

export type schemaAuthThreadDTO = z.infer<typeof schemaAuthThread>;


export interface formData {
  description: string,
  image: File | undefined;
}

export interface typeThread {
    id: string;
  description: string;       
  image?: string | undefined;     
  createdAt: string;        
  author : typeAuthor;
  _count?: {
    replies: number;
    likes?: number; 
  };
}

export interface typeThreadPayload {
  message: string;
  data: typeThread[];
}

export interface typeAuthor {
    id :string
    username: string
    profile: typeProfile
}

export interface typeThreadSinggel {
  message: string;
  data: typeThread; 
}


