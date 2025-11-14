export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-white animate-pulse">
      <div className="w-full max-w-lg p-8 rounded-2xl shadow-lg border border-gray-700 bg-neutral-900">

        {/* Title */}
        <div className="h-7 bg-neutral-700 rounded w-40 mx-auto mb-6"></div>

        {/* Error / Success Box Placeholder */}
        <div className="h-10 bg-neutral-700 rounded w-full mb-4 opacity-50"></div>

        {/* Email Field */}
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-neutral-700 rounded w-20"></div>
          <div className="h-10 bg-neutral-700 rounded"></div>
        </div>

        {/* Button */}
        <div className="h-12 bg-yellow-700 rounded w-full"></div>
      </div>
    </div>
  );
}
