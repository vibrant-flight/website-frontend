"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import AdminNavbar from "@/components/AdminNavbar";
export default function NavbarWrapper() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  return isAdminRoute ? <AdminNavbar /> : <Navbar />;
}
