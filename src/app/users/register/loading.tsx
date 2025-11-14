export default function Loading() {
  return (
    <div className="flex flex-col bg-neutral-800 items-center w-full max-w-lg m-auto justify-center min-h-[60vh] p-4 sm:p-8 animate-pulse">

      {/* Title */}
      <div className="h-8 bg-neutral-700 rounded w-32 mb-6"></div>

      <div className="w-full bg-neutral-900 rounded-lg shadow p-4 sm:p-6 space-y-5">

        {/* Error Box */}
        <div className="w-full h-10 bg-red-800 opacity-40 rounded"></div>

        {/* First Name */}
        <div className="space-y-2">
          <div className="h-4 bg-neutral-700 rounded w-24"></div>
          <div className="h-10 bg-neutral-700 rounded border border-yellow-300"></div>
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <div className="h-4 bg-neutral-700 rounded w-24"></div>
          <div className="h-10 bg-neutral-700 rounded border border-yellow-300"></div>
        </div>

        {/* Email + Verify */}
        <div className="space-y-2">
          <div className="h-4 bg-neutral-700 rounded w-16"></div>
          <div className="flex">
            <div className="w-[80%] h-10 bg-neutral-700 rounded-l border border-yellow-300"></div>
            <div className="w-[20%] h-10 bg-yellow-600 rounded-r"></div>
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="h-4 bg-neutral-700 rounded w-20"></div>
          <div className="flex">
            <div className="w-[90%] h-10 bg-neutral-700 rounded-l border border-yellow-300"></div>
            <div className="w-[10%] h-10 bg-yellow-600 rounded-r"></div>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <div className="h-4 bg-neutral-700 rounded w-32"></div>
          <div className="h-10 bg-neutral-700 rounded border border-yellow-300"></div>
        </div>

        {/* Sign Up Button */}
        <div className="h-12 bg-yellow-600 rounded w-full mt-4"></div>
      </div>

      {/* OTP POPUP SKELETON */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-neutral-800 rounded-lg shadow-lg p-6 w-full max-w-xs space-y-4">

          <div className="h-5 bg-neutral-700 rounded w-24 mx-auto"></div>

          <div className="h-10 bg-neutral-700 rounded w-full"></div>

          <div className="flex gap-3">
            <div className="h-10 bg-yellow-600 rounded w-full"></div>
            <div className="h-10 bg-gray-400 rounded w-full"></div>
          </div>

        </div>
      </div>

    </div>
  );
}
