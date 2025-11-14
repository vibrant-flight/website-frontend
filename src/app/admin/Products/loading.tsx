export default function Loading() {
  return (
    <div className="w-full font-bold animate-pulse p-6">

      {/* Table */}
      <table className="m-auto my-5 table-auto w-full max-w-[95%]">
        <thead className="bg-neutral-900 text-white">
          <tr>
            {[
              "Image", "Name", "Actual Price", "Price", "Fabric", "Category",
              "S", "M", "L", "XL", "XXL", "XXXL", "Delete", "Update"
            ].map((col) => (
              <th key={col} className="px-5 py-2">
                <div className="h-4 bg-neutral-700 rounded w-20 mx-auto"></div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-neutral-800 text-white">
          {Array.from({ length: 7 }).map((_, rowIdx) => (
            <tr key={rowIdx} className="border-b border-neutral-700">

              {/* Image */}
              <td className="px-5 py-4">
                <div className="w-20 h-20 bg-neutral-700 rounded"></div>
              </td>

              {/* Name */}
              <td className="px-5 py-4">
                <div className="h-4 bg-neutral-700 rounded w-32"></div>
              </td>

              {/* Actual Price */}
              <td className="px-5 py-4">
                <div className="h-4 bg-neutral-700 rounded w-16"></div>
              </td>

              {/* Price */}
              <td className="px-5 py-4">
                <div className="h-4 bg-neutral-700 rounded w-16"></div>
              </td>

              {/* Fabric */}
              <td className="px-5 py-4">
                <div className="h-4 bg-neutral-700 rounded w-24"></div>
              </td>

              {/* Category */}
              <td className="px-5 py-4">
                <div className="h-4 bg-neutral-700 rounded w-20"></div>
              </td>

              {/* Sizes S - XXXL */}
              {Array.from({ length: 6 }).map((_, i) => (
                <td key={i} className="px-5 py-4">
                  <div className="h-4 bg-neutral-700 rounded w-10"></div>
                </td>
              ))}

              {/* Delete Icon */}
              <td className="px-5 py-4">
                <div className="w-8 h-8 bg-neutral-700 rounded"></div>
              </td>

              {/* Update Icon */}
              <td className="px-5 py-4">
                <div className="w-8 h-8 bg-neutral-700 rounded"></div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* Load More Button */}
      <div className="text-center mb-10">
        <div className="h-10 w-36 bg-neutral-700 rounded mx-auto"></div>
      </div>
    </div>
  );
}
