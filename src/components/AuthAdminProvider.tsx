"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { UserView } from "@/utils/users/userView";
interface AuthAdminContextType {
  adminData: UserView;
  logOut: () => void;
  getData: () => void;
}

export const AuthAdminContext = createContext<AuthAdminContextType>({
  adminData: {} as UserView,
  logOut: () => {},
  getData: () => {}
});

export default function AuthAdminProvider({ children }: { children: ReactNode }) {
  const [adminData, setAdminData] = useState<UserView>({} as UserView);
  const router = useRouter();
  const getData = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admins/me`, {
      method: "GET",
      credentials: "include",
    }).then(res => {
      if (res.ok) return res.json();
      throw new Error("Not authenticated");
    })  
    .then(data => {
      if (data && data.isAdmin) {
        setAdminData({
          firstName:data.firstName,
          lastName:data.lastName,
          email:data.email,
          password:data.password,
          isAdmin:data.isAdmin,
          errorMessage:"",
          lastLogIn:data.lastLogIn,
        });
      }
      else {
        setAdminData({} as UserView);
      }
    })
    .catch(() => {
      setAdminData({} as UserView);
    }); 
  }
  useEffect(() => {
    getData();
  }, [router]);

  const logOut = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admins/logout`, {
      method: "GET",
      credentials: "include",
    });
    setAdminData({} as UserView);
    router.push("/");
  };

  return (
    <AuthAdminContext.Provider value={{ adminData, logOut,getData }}>
      {children}
    </AuthAdminContext.Provider>
  );
}
