"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/components/AuthProvider";
import {faUserCircle,faShoppingCart,faBoxOpen,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
export default function Profile() {
  const auth = useContext(AuthContext);
  useEffect(() => { 
    auth.getData();
  }, [auth]);
  return (
    <div className="min-h-screen w-full bg-gray-900 p-6 flex flex-col items-center">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-3xl flex flex-col sm:flex-row items-center gap-6">
        <FontAwesomeIcon icon={faUserCircle} className="text-8xl sm:text-9xl text-gray-300"/>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            Hi, {auth.userData.firstName}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Welcome to your profile
          </p>
        </div>
      </div>
      <div className="mt-6 bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-3xl">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="text-lg font-medium text-gray-300">
              Email:
            </span>
            <span className="text-lg text-white">
              {auth.userData.email}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        <Link href="/users/cart">
          <button className="flex flex-col items-center justify-center bg-gray-800 shadow-lg rounded-2xl p-6 hover:bg-gray-700 transition">
            <FontAwesomeIcon icon={faShoppingCart} className="text-3xl text-indigo-400 mb-2"/>
            <span className="text-white font-medium">
              My Cart
            </span>
          </button>
        </Link>
        <Link href="/users  /orders">
          <button className="flex flex-col items-center justify-center bg-gray-800 shadow-lg rounded-2xl p-6 hover:bg-gray-700 transition">
            <FontAwesomeIcon icon={faBoxOpen} className="text-3xl text-green-400 mb-2" />
            <span className="text-white font-medium">
              My Orders
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
