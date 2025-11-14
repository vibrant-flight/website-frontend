export default function Loading() {
  return (
    <div className="animate-pulse">
      
      {/* Carousel Skeleton */}
      <div className="w-full h-56 md:h-72 bg-neutral-700" />

      {/* Drop Live Now Badge */}
      <div className="bg-neutral-800 w-fit mx-auto my-5 text-yellow-300 text-center rounded-full px-6 py-2 font-bold opacity-50">
        Loading...
      </div>

      {/* Categories Skeleton */}
      <div className="flex flex-row justify-evenly overflow-x-auto gap-4 py-2 px-2 scrollbar-hide">
        {Array(5).fill(null).map((_, i) => (
          <div key={i} className="text-white flex flex-col items-center min-w-[100px]">
            <div className="w-24 h-24 bg-neutral-700 rounded-full" />
            <div className="mt-2 h-3 bg-neutral-600 rounded w-14" />
          </div>
        ))}
      </div>

      {/* Product Grid Skeleton */}
      <div className="m-auto grid gap-6 w-full max-w-7xl grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-4">
        {Array(10).fill(null).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-neutral-700 rounded-xl shadow-xl overflow-hidden w-full"
          >
            <div className="w-full h-44 md:h-52 lg:h-56 xl:h-60 bg-neutral-600" />
            <div className="bg-neutral-600 text-white w-full text-center px-3 py-3 space-y-3">
              <div className="h-4 bg-neutral-500 rounded w-3/4 mx-auto" />
              <div className="flex flex-row justify-center gap-3">
                <div className="h-4 bg-neutral-500 rounded w-10" />
                <div className="h-4 bg-neutral-500 rounded w-10" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
