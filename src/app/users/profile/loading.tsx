export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-gray-900 p-6 flex flex-col items-center animate-pulse">

      {/* Profile Header Card */}
      <div className="bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-3xl flex flex-col sm:flex-row items-center gap-6">
        {/* User Icon Placeholder */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-700 rounded-full"></div>

        {/* Text Section */}
        <div className="text-center sm:text-left w-full space-y-3">
          <div className="h-6 bg-gray-700 rounded w-40 mx-auto sm:mx-0"></div>
          <div className="h-4 bg-gray-700 rounded w-32 mx-auto sm:mx-0"></div>
        </div>
      </div>

      {/* Email Section */}
      <div className="mt-6 bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-3xl">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">

            {/* Label */}
            <div className="h-5 bg-gray-700 rounded w-24"></div>

            {/* Value */}
            <div className="h-5 bg-gray-700 rounded w-40"></div>

          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 gap-6 w-full max-w-3xl">

        {/* My Cart */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-gray-700 rounded mb-3"></div>
          <div className="h-4 bg-gray-700 rounded w-20"></div>
        </div>

        {/* My Orders */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-gray-700 rounded mb-3"></div>
          <div className="h-4 bg-gray-700 rounded w-20"></div>
        </div>

      </div>
    </div>
  );
}
