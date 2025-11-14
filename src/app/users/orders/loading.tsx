export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6 animate-pulse">

      {/* Grid Skeleton */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

        {Array(3).fill(null).map((_, i) => (
          <div
            key={i}
            className="bg-neutral-950 rounded-lg shadow-xl p-4 md:p-6 space-y-5"
          >
            {/* Order Header */}
            <div className="flex items-center justify-between">
              <div className="h-5 bg-neutral-700 rounded w-28"></div>
              <div className="h-5 bg-neutral-700 rounded w-20"></div>
            </div>

            {/* Order Summary */}
            <div className="space-y-3">
              <div className="h-4 bg-neutral-700 rounded w-32"></div>
              <div className="h-4 bg-neutral-700 rounded w-40"></div>

              {/* Address */}
              <div className="space-y-2 mt-3">
                <div className="h-4 bg-neutral-700 rounded w-24"></div>
                <div className="h-16 bg-neutral-800 rounded"></div>
                <div className="h-4 bg-neutral-700 rounded w-20"></div>
              </div>

              {/* Change Address Button */}
              <div className="h-10 bg-neutral-700 rounded w-32 mt-2"></div>
            </div>

            {/* Order Items */}
            <div className="space-y-3 mt-4">
              {Array(2).fill(null).map((_, j) => (
                <div
                  key={j}
                  className="flex gap-3 bg-neutral-700 rounded-lg p-3"
                >
                  {/* Image */}
                  <div className="w-20 h-20 bg-neutral-600 rounded-md"></div>

                  {/* Item Details */}
                  <div className="flex flex-col justify-center space-y-2">
                    <div className="h-4 bg-neutral-600 rounded w-16"></div>
                    <div className="h-4 bg-neutral-600 rounded w-12"></div>
                    <div className="h-4 bg-neutral-600 rounded w-10"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
