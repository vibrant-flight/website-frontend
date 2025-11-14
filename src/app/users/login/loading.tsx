export default function Loading() {
  return (
    <div className="bg-neutral-700 flex flex-col items-center w-full max-w-lg m-auto justify-center min-h-[60vh] p-4 sm:p-8 animate-pulse">

      {/* Title */}
      <div className="h-8 bg-neutral-600 rounded w-32 mb-6"></div>

      <div className="w-full bg-neutral-800 rounded-lg shadow p-4 sm:p-6 space-y-5">

        {/* Error Placeholder */}
        <div className="w-full h-10 bg-red-800 rounded opacity-40"></div>

        {/* Email Field */}
        <div className="space-y-2">
          <div className="h-4 bg-neutral-600 rounded w-20"></div>
          <div className="h-10 bg-neutral-700 rounded border border-amber-300"></div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="h-4 bg-neutral-600 rounded w-24"></div>
          <div className="flex">
            <div className="w-[90%] h-10 bg-neutral-700 rounded-l border border-amber-300"></div>
            <div className="w-[10%] h-10 bg-amber-700 rounded-r"></div>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="h-4 bg-neutral-600 rounded w-32"></div>

        {/* Login Button */}
        <div className="h-12 bg-amber-600 rounded"></div>

        {/* Signup Link */}
        <div className="h-4 bg-neutral-600 rounded w-40 mx-auto mt-6"></div>

      </div>
    </div>
  );
}
