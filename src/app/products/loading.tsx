export default function Loading() {
  return (
    <div className="bg-neutral-800 flex min-h-screen">
      <main className="flex-1 flex flex-col items-center px-4 py-6 w-full">

        {/* Skeleton for Category Tabs */}
        <div className="w-full flex justify-around overflow-x-auto gap-4 mb-6 px-2 py-2 scrollbar-hide animate-pulse">
          {Array(5).fill(null).map((_, i) => (
            <div key={i} className="shrink-0 flex flex-col items-center">
              <div className="w-16 h-16 bg-neutral-700 rounded-full" />
              <div className="h-3 bg-neutral-600 rounded w-10 mt-2" />
            </div>
          ))}
        </div>

        {/* Skeleton for Product Cards */}
        <div className="m-auto grid gap-6 w-full items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 animate-pulse">
          {Array(8).fill(null).map((_, i) => (
            <div
              key={i}
              className="flex flex-col bg-neutral-700 rounded-xl shadow-lg overflow-hidden w-full"
            >
              <div className="w-full h-44 md:h-52 lg:h-56 xl:h-60 bg-neutral-600" />
              <div className="w-full px-4 py-3">
                <div className="h-4 bg-neutral-500 rounded w-3/4 mb-2" />
                <div className="h-4 bg-neutral-500 rounded w-1/2 mx-auto" />
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button Skeleton */}
        <div className="mt-10 w-40 h-12 bg-neutral-700 rounded-lg animate-pulse" />
      </main>
    </div>
  );
}
