export default function Loading() {
  return (
    <div className="p-6 animate-pulse">

      {/* Page Title */}
      <div className="h-7 bg-neutral-700 rounded w-32 mb-6"></div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-neutral-800 text-white rounded-lg">

          {/* Table Header */}
          <thead className="bg-neutral-900">
            <tr>
              {[
                "Order ID",
                "Payment ID",
                "Email",
                "Mobile",
                "Address",
                "Pin Code",
                "Items",
                "Amount",
                "Status",
                "Tracking Id",
                "Dispatch",
              ].map((h) => (
                <th key={h} className="px-4 py-3">
                  <div className="h-4 bg-neutral-700 rounded w-20 mx-auto"></div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIdx) => (
              <tr key={rowIdx} className="border-b border-neutral-700">

                {/* Order ID */}
                <td className="px-4 py-4">
                  <div className="h-4 bg-neutral-700 rounded w-24"></div>
                </td>

                {/* Payment ID */}
                <td className="px-4 py-4">
                  <div className="h-4 bg-neutral-700 rounded w-24"></div>
                </td>

                {/* Email */}
                <td className="px-4 py-4">
                  <div className="h-4 bg-neutral-700 rounded w-32"></div>
                </td>

                {/* Mobile */}
                <td className="px-4 py-4">
                  <div className="h-4 bg-neutral-700 rounded w-20"></div>
                </td>

                {/* Address */}
                <td className="px-4 py-4">
                  <div className="h-10 bg-neutral-700 rounded w-40"></div>
                </td>

                {/* Pin Code */}
                <td className="px-4 py-4">
                  <div className="h-4 bg-neutral-700 rounded w-16"></div>
                </td>

                {/* Items column */}
                <td className="px-4 py-4">
                  <div className="space-y-3">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-16 h-16 bg-neutral-700 rounded"></div>
                        <div className="space-y-2">
                          <div className="h-3 bg-neutral-700 rounded w-10"></div>
                          <div className="h-3 bg-neutral-700 rounded w-8"></div>
                          <div className="h-3 bg-neutral-700 rounded w-12"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>

                {/* Amount */}
                <td className="px-4 py-4">
                  <div className="h-4 bg-neutral-700 rounded w-16"></div>
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <div className="h-4 bg-neutral-700 rounded w-20"></div>
                </td>

                {/* Tracking ID */}
                <td className="px-4 py-4">
                  <div className="h-4 bg-neutral-700 rounded w-24"></div>
                </td>

                {/* Dispatch section */}
                <td className="px-4 py-4">
                  <div className="space-y-2">

                    {/* Input */}
                    <div className="h-9 bg-neutral-700 rounded"></div>

                    {/* Buttons */}
                    <div className="flex gap-2">
                      <div className="h-8 bg-green-700 rounded w-16"></div>
                      <div className="h-8 bg-red-700 rounded w-16"></div>
                    </div>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
