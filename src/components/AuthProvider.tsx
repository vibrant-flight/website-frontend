"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { UserView } from "@/utils/users/userView";
interface AuthContextType {
  userData: UserView;
  logOut: () => void;
  getData: () => void;
}
export const AuthContext = createContext<AuthContextType>({
  userData: {} as UserView,
  logOut: () => {},
  getData: () => {}
});
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserView>({} as UserView);
  const router = useRouter();
  const getData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        setUserData({} as UserView);
        throw new Error();
      }
      const data = await res.json();
      setUserData({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password:"",
        isAdmin: data.isAdmin,
        errorMessage: "",
        lastLogIn: data.lastLogIn,
      });
    } 
    catch {
      setUserData({} as UserView);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const logOut = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/logout`, {
      method: "GET",
      credentials: "include",
    });
    setUserData({} as UserView);
    router.push("/users/login");
  };
  return (
    <AuthContext.Provider value={{ userData, logOut, getData }}>
      {children}
    </AuthContext.Provider>
  );
}
