import z from "zod"

export const schemaAuthLogin = z.object({
    email: z.string().min(1, {message: "Email tidak falid!"}),
    password: z.string().min(1, {message: "Password salah!"})
})

export type schemaAuthLoginDTO = z.infer<typeof schemaAuthLogin>