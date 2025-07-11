import z from "zod";

export const schemaAuthRegister = z.object({
  username: z.string().min(1, { message: "Username tidak valid!" }),
  email: z.string().min(1, { message: "Email tidak valid!" }),
  password: z.string().min(1, { message: "Password salah!" }),
});

//nama typenya ini tuhhhhhh
export type schemaAuthRegisterDTO = z.infer<typeof schemaAuthRegister>;
