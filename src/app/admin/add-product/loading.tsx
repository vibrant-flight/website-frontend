export default function Loading() {
  return (
    <form className="max-w-md mx-auto bg-neutral-800 rounded-lg shadow-md p-6 mt-8 animate-pulse">

      {/* Title */}
      <div className="h-7 bg-neutral-700 w-40 rounded mx-auto mb-6"></div>

      {/* Name */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-neutral-700 w-20 rounded"></div>
        <div className="h-10 bg-neutral-700 rounded"></div>
      </div>

      {/* Category */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-neutral-700 w-24 rounded"></div>
        <div className="h-10 bg-neutral-700 rounded"></div>
      </div>

      {/* Actual Price */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-neutral-700 w-28 rounded"></div>
        <div className="h-10 bg-neutral-700 rounded"></div>
      </div>

      {/* Offer Price */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-neutral-700 w-24 rounded"></div>
        <div className="h-10 bg-neutral-700 rounded"></div>
      </div>

      {/* Fabric */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-neutral-700 w-20 rounded"></div>
        <div className="h-10 bg-neutral-700 rounded"></div>
      </div>

      {/* Sizes */}
      <div className="mb-4">
        <div className="h-4 bg-neutral-700 w-16 rounded mb-3"></div>

        {["S", "M", "L", "XL", "XXL", "XXXL"].map((sz) => (
          <div key={sz} className="flex justify-between items-center mb-2">
            <div className="h-4 bg-neutral-700 rounded w-10"></div>
            <div className="h-10 bg-neutral-700 rounded w-24"></div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-neutral-700 w-24 rounded"></div>
        <div className="h-28 bg-neutral-700 rounded"></div>
        <div className="h-3 bg-neutral-700 w-12 rounded ml-auto"></div>
      </div>

      {/* Image Upload Blocks */}
      {[1, 2, 3, 4].map((idx) => (
        <div key={idx} className="space-y-2 mb-6">

          <div className="h-4 bg-neutral-700 w-28 rounded"></div>

          {/* File input skeleton */}
          <div className="h-10 bg-neutral-700 rounded"></div>

          {/* Small text */}
          <div className="h-3 bg-neutral-700 w-32 rounded"></div>

          {/* Preview box */}
          <div className="w-full flex justify-center">
            <div className="w-24 h-24 bg-neutral-700 rounded"></div>
          </div>
        </div>
      ))}

      {/* Submit Button */}
      <div className="h-12 bg-green-600 rounded w-full"></div>

    </form>
  );
}
