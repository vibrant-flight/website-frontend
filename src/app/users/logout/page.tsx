"use client";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthProvider';
import { useContext, useEffect } from 'react';
export default function LogOut() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    auth.logOut();
    router.push("/");
  }, []);
  return (
    <div className="text-center mt-10 text-lg text-gray-600 dark:text-white">Logging you out...</div>
  );

}