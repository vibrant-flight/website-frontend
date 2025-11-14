export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT: Big Image + Thumbnails */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg bg-gray-800" />

            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-md bg-gray-800"
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Product Details Skeleton */}
          <div className="space-y-6">
            {/* Title */}
            <div className="h-8 bg-gray-700 rounded w-3/4"></div>

            {/* Price */}
            <div className="h-6 bg-gray-700 rounded w-1/2"></div>

            {/* Description */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-700 rounded w-4/6"></div>
            </div>

            {/* Sizes */}
            <div>
              <div className="h-5 bg-gray-700 rounded w-20 mb-3"></div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-10 w-16 bg-gray-800 rounded"></div>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <div className="h-5 bg-gray-700 rounded w-24"></div>
              <div className="h-10 bg-gray-800 rounded w-40"></div>
            </div>

            {/* Add to Cart Button */}
            <div className="h-12 rounded-md bg-yellow-700 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
