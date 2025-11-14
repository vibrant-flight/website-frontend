export default function Loading() {
  return (
    <div className="max-w-sm mx-auto mt-10 border border-neutral-700 rounded-lg p-6 bg-neutral-900 shadow-md animate-pulse">

      {/* Title */}
      <div className="h-6 bg-neutral-700 rounded w-32 mb-6"></div>

      {/* Cart Items Skeleton */}
      {Array(3).fill(null).map((_, i) => (
        <div key={i} className="flex items-center mb-6">

          {/* Image */}
          <div className="w-24 h-28 bg-neutral-700 rounded-md mr-5"></div>

          {/* Item Details */}
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-neutral-600 rounded w-3/4"></div>
            <div className="h-4 bg-neutral-600 rounded w-1/2"></div>
            <div className="h-4 bg-neutral-600 rounded w-1/3"></div>

            {/* Quantity controls */}
            <div className="flex items-center gap-3 mt-4">
              <div className="w-7 h-7 bg-neutral-700 rounded-full"></div>
              <div className="w-6 h-5 bg-neutral-700 rounded"></div>
              <div className="w-7 h-7 bg-neutral-700 rounded-full"></div>
            </div>
          </div>

          {/* Trash Icon */}
          <div className="w-8 h-8 bg-neutral-700 rounded-full ml-3"></div>
        </div>
      ))}

      {/* Subtotal */}
      <div className="h-5 bg-neutral-700 rounded w-40 mt-6 mb-4"></div>

      {/* Checkout Button */}
      <div className="h-12 bg-neutral-700 rounded w-full mt-4"></div>
    </div>
  );
}
