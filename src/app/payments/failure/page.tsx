"use client";
import { useRouter } from "next/navigation";
export default function Failure() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800 text-center">
        <div className="text-red-500 text-6xl mb-4">✗</div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Payment Failed</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Sorry, we couldn't process your payment. Please try again.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/users/checkout")}
            className="flex-1 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
