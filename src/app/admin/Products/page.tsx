"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { ItemView } from "@/utils/items/itemView";
export default function ProductsList() {
  const [products, setProducts] = useState([] as ItemView[]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [showUpdateBox, setShowUpdateBox] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [sizeInputs, setSizeInputs] = useState<Record<string,number>>({
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
    XXL: 0,
    XXXL: 0,
  });
  const fetchProducts = async (page:Number) => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admins/items-list?page=${currentPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })
      if(res.ok) {
        let data = await res.json();
        if(data.length === 0) {
          setHasMore(false);
        } 
        else {
          setProducts((prev) => {
            const merged = [...prev, ...data];
            const unique = merged.filter((v, i, a) => a.findIndex((t) => t.itemId === v.itemId) === i);
            return unique;
          });
        }
      }
    } 
    catch (err) {
      console.error("Fetch error:", err);
    } 
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts(currentPage);
  }, []);
  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await fetchProducts(nextPage);
  };
  const deleteProduct = async (productId:string) => {
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admins/delete-product`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body:JSON.stringify({productId}),
      })
      if(res.ok) {
        alert("Product Deletion success");
        setCurrentPage(1);
        setHasMore(true);
        setProducts([]);
        fetchProducts(1);
      }
    }
    catch (err) {
      alert("Error in deletion");
    }
  };

  const openUpdateBox = (itemId:string) => {
    const product = products.find((p) => p.itemId === itemId);
    if (!product) return;
    setSelectedProductId(itemId);
    setShowUpdateBox(true);
  };

  const handleSizeChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSizeInputs((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  const handleUpdateSubmit = async () => {
    try {
      let product = { itemId: selectedProductId, ...sizeInputs };
      let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admins/update-item`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body:JSON.stringify(product)
      })
      if(res.ok) {
        setShowUpdateBox(false);
        setCurrentPage(1);
        setHasMore(true);
        setProducts([]);
        setSizeInputs({ S: 0, M: 0, L: 0, XL: 0, XXL: 0, XXXL: 0 });
        fetchProducts(1);
      }
    } 
    catch (err) {
      console.error("Update error", err);
      alert("Fail to update");
    }
  };

  return (
    <div className="w-full font-bold">
      <table className="m-auto my-5 table-auto">
        <thead className="bg-neutral-1200 text-white">
          <tr>
            <th className="px-5">Image</th>
            <th className="px-5">Name</th>
            <th className="px-5">Actual Price</th>
            <th className="px-5">Price</th>
            <th className="px-5">Fabric</th>
            <th className="px-5">Category</th>
            <th className="px-5">S</th>
            <th className="px-5">M</th>
            <th className="px-5">L</th>
            <th className="px-5">XL</th>
            <th className="px-5">XXL</th>
            <th className="px-5">XXXL</th>
            <th className="px-5">Delete Product</th>
            <th className="px-5">Update Stock</th>
          </tr>
        </thead>
        <tbody className="bg-neutral-800 text-white">
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.itemId} id={product.itemId}>
                <td className="px-5">
                  <img
                    src={product.image}
                    alt=""
                    loading="lazy"
                    width={200}
                  />
                </td>
                <td className="px-5">{product.name}</td>
                <td className="px-5">₹ {product.actualPrice}</td>
                <td className="px-5">₹ {product.price}</td>
                <td className="px-5">{product.fabric}</td>
                <td className="px-5">{product.category}</td>
                <td className="px-5">{product.size.S}</td>
                <td className="px-5">{product.size.M}</td>
                <td className="px-5">{product.size.L}</td>
                <td className="px-5">{product.size.XL}</td>
                <td className="px-5">{product.size.XXL}</td>
                <td className="px-5">{product.size.XXXL}</td>
                <td className="px-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => deleteProduct(product.itemId)}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-8 fill-red-500 text-red-950 hover:cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </td>
                <td className="px-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => openUpdateBox(product.itemId)}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8 fill-green-900 text-green-500 hover:cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={14}
                className="text-center text-gray-600 dark:text-gray-300 py-10 text-xl font-semibold"
              >
                Out of Stock
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {hasMore && (
        <div className="text-center mb-10">
          <button
            className="bg-gray-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-gray-700 disabled:opacity-50"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
      {showUpdateBox && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 dark:text-gray-300 text-black p-6 rounded-lg w-[90%] max-w-md space-y-4 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Update Stock</h2>
            <label className="block text-sm">Product ID</label>
            <input
              type="text"
              value={selectedProductId}
              disabled
              className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-700"
            />
            {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
              <div key={size}>
                <label className="block font-medium">{size}</label>
                <input
                  type="number"
                  name={size}
                  value={sizeInputs[size]}
                  onChange={handleSizeChange}
                  className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-700"
                  min={0}
                />
              </div>
            ))}
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setShowUpdateBox(false)}
                className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500"
              >
                Cancel
              </button>
              <button onClick={handleUpdateSubmit} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 hover:cursor-pointer">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
