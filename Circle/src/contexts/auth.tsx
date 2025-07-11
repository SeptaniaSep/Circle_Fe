import type { schemaAuthRegisterDTO } from "@/components/schemas/schemaAuthRegister";
import React, { createContext, useState } from "react";


interface AuthContextType {
  user: schemaAuthRegisterDTO;
  setUser: React.Dispatch<React.SetStateAction<schemaAuthRegisterDTO>>;
}
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<schemaAuthRegisterDTO>({
    username: "no user",
    email: "-",
    password: "-",
  } as schemaAuthRegisterDTO);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};