export default function Loading() {
  return (
    <div className="m-auto grid gap-6 w-full max-w-7xl grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-5">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse flex flex-col bg-neutral-700 rounded-xl overflow-hidden"
        >
          <div className="w-full h-44 md:h-52 lg:h-56 xl:h-60 bg-neutral-600" />
          <div className="p-3">
            <div className="h-4 bg-neutral-500 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-neutral-500 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
