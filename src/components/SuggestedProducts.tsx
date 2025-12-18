"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import Image from "next/image";
import { ItemView } from "@/utils/items/itemView";
import Link from "next/link";
const ITEMS_PER_PAGE = 1;
export default function SuggestedProducts() {
  const [products, setProducts] = useState<ItemView[]>([]);
  const [page, setPage] = useState(0);
  const auth = useContext(AuthContext);
  useEffect(() => {
    auth.getData();
  }, []);
  useEffect(() => {
    if(auth.userData === undefined) return;
      fetchProducts();
    }, [auth.userData]);
  const fetchProducts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/items/suggested`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email:auth.userData.email,
      }),
      credentials: "include",
    });
    const data = await res.json();
    setProducts(data.products || []);
  }
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const start = page * ITEMS_PER_PAGE;
  const currentProducts = products.slice(start, start + ITEMS_PER_PAGE);
  if (!products.length) return null;
  return (
    <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-10">
      <div className="flex justify-center mb-8">
        <span className="bg-neutral-900 text-yellow-300 font-[arial-black] font-bold px-6 py-2 rounded-full text-sm sm:text-base tracking-wide shadow-md">
          Continue Exploring
        </span>
      </div>
      <div className="relative max-w-5xl mx-auto px-3">
        {currentProducts.map((product) => {
          const soldOut =
            product.size.S === 0 &&
            product.size.M === 0 &&
            product.size.L === 0 &&
            product.size.XL === 0 &&
            product.size.XXL === 0 &&
            product.size.XXXL === 0;
          return (
            <Link key={product.itemId} href={`/products/${product.itemId}`}>
              <div className="group flex flex-row bg-neutral-800 rounded-2xl shadow-xl hover:shadow-2xl transition mb-4">
                <div className="relative w-[110px] h-auto sm:w-[260px] shrink-0">
                  {soldOut && (
                    <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                      Sold Out
                    </span>
                  )}
                  <Image src={product.image} alt={product.name} fill className="object-fit h-full group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="flex flex-col justify-between px-3 sm:px-6 py-3 sm:py-5 text-white flex-1">
                  <div>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-gray-400">
                      {product.category}
                    </span>
                    <h3 className="text-sm sm:text-xl font-bold leading-snug mt-1 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2 sm:mb-4">
                      <span className="text-xs sm:text-sm text-gray-400 line-through">
                        ₹ {product.actualPrice}
                      </span>
                      <span className="text-lg sm:text-2xl font-extrabold text-yellow-400">
                        ₹ {product.price}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="h-px bg-neutral-700 mb-2 sm:mb-3" />
                    <span className="text-xs sm:text-sm text-gray-300">
                      Premium {product.fabric}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index} onClick={() => setPage(index)} aria-label={`Go to page ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300
              ${page === index
                ? "bg-yellow-400 w-6"
                : "bg-gray-400 w-2.5 hover:bg-gray-500"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
