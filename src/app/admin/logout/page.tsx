"use client";
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { AuthAdminContext } from '@/components/AuthAdminProvider';
export default function AdminLogOut() {
  const adminAuth = useContext(AuthAdminContext);
  const router = useRouter();
  useEffect(() => {
    adminAuth.logOut();
    router.push("/");
  }, []);
  return (
    <div className="text-center mt-10 text-lg text-gray-600">Logging you out...</div>
  );

}