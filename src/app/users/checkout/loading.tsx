export default function Loading() {
  return (
    <div className="max-w-md mx-auto p-5 rounded-lg shadow border bg-neutral-900 text-white border-gray-700 animate-pulse mt-10">

      {/* Title */}
      <div className="h-6 bg-neutral-700 rounded w-32 mb-4"></div>

      {/* Sub Title */}
      <div className="h-5 bg-neutral-700 rounded w-24 mb-4"></div>

      {/* Products Skeleton List */}
      <div className="space-y-4">
        {Array(3).fill(null).map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="flex gap-3">
              <div className="w-20 h-20 bg-neutral-700 rounded"></div>
              <div className="space-y-2 mt-3">
                <div className="h-4 bg-neutral-600 rounded w-16"></div>
                <div className="h-4 bg-neutral-600 rounded w-10"></div>
              </div>
            </div>
            <div className="h-5 bg-neutral-600 rounded w-12 mt-4"></div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between mt-6">
        <div className="h-5 bg-neutral-700 rounded w-16"></div>
        <div className="h-5 bg-neutral-700 rounded w-10"></div>
      </div>

      {/* Mobile Number */}
      <div className="mt-6">
        <div className="h-4 bg-neutral-700 rounded w-28 mb-2"></div>
        <div className="h-10 bg-neutral-800 rounded border border-gray-600"></div>
      </div>

      {/* Address */}
      <div className="mt-6">
        <div className="h-4 bg-neutral-700 rounded w-28 mb-2"></div>
        <div className="h-20 bg-neutral-800 rounded border border-gray-600"></div>
      </div>

      {/* Pincode */}
      <div className="mt-6">
        <div className="h-4 bg-neutral-700 rounded w-20 mb-2"></div>
        <div className="h-10 bg-neutral-800 rounded border border-gray-600"></div>
      </div>

      {/* Delivery Charge */}
      <div className="flex justify-between mt-6">
        <div className="h-4 bg-neutral-700 rounded w-24"></div>
        <div className="h-4 bg-neutral-700 rounded w-10"></div>
      </div>

      {/* Grand Total */}
      <div className="flex justify-between mt-4">
        <div className="h-5 bg-neutral-700 rounded w-28"></div>
        <div className="h-5 bg-neutral-700 rounded w-12"></div>
      </div>

      {/* Buttons */}
      <div className="h-12 bg-neutral-700 rounded w-full mt-6"></div>
      <div className="h-12 bg-neutral-700 rounded w-full mt-3"></div>
    </div>
  );
}
