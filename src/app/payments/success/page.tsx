"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Success() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800 text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Payment Successful!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thank you for your order. Your payment has been processed successfully.
        </p>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Check Orders your orders page
          </p>
        </div>
        <button
          onClick={() => router.push("/")}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          You'll be redirected to homepage in 5 seconds...
        </p>
      </div>
    </div>
  );
}
