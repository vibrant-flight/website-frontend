"use client";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft,faChevronRight,} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "./AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { ItemView } from "@/utils/items/itemView";
const ITEMS_PER_PAGE = 3;
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

    const prev = () => setPage((p) => Math.max(p - 1, 0));
    const next = () =>
        setPage((p) => Math.min(p + 1, totalPages - 1));

    if (!products.length) return null;

    return (
        <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-10">
            <div className="flex justify-center mb-8">
                <span className="bg-neutral-900 text-yellow-300 px-6 py-2 rounded-full text-sm sm:text-base font-semibold tracking-wide shadow-md">
                Continue Exploring
                </span>
            </div>
            <div className="relative">
                <button
                    onClick={prev}
                    disabled={page === 0}
                    aria-label="Previous products"
                    className="hidden md:flex items-center justify-center absolute -left-6 top-1/2 -translate-y-1/2 z-10 
                            h-10 w-10 rounded-full bg-white shadow-lg 
                            hover:bg-gray-100 transition disabled:opacity-30"
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
                            <div className="group bg-neutral-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform hover:-translate-y-1">
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    {soldOut && (
                                    <span className="absolute top-3 right-3 z-10 bg-red-700 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                        Sold Out
                                    </span>
                                    )}
                                    <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    loading="lazy"
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <div className="bg-neutral-700 text-white text-center px-3 py-4">
                                    <h3 className="text-sm sm:text-base font-semibold truncate">
                                    {product.name}
                                    </h3>

                                    <div className="flex justify-center items-center gap-3 mt-2">
                                    <span className="text-xs sm:text-sm text-yellow-300 line-through font-medium">
                                        ₹ {product.actualPrice}
                                    </span>
                                    <span className="text-sm sm:text-base text-yellow-400 font-bold">
                                        ₹ {product.price}
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
                </div>
                <button
                    onClick={next}
                    disabled={page === totalPages - 1}
                    aria-label="Next products"
                    className="hidden md:flex items-center justify-center absolute -right-6 top-1/2 -translate-y-1/2 z-10 
                                h-10 w-10 rounded-full bg-white shadow-lg 
                                hover:bg-gray-100 transition disabled:opacity-30"
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
            <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => setPage(index)}
                    aria-label={`Go to page ${index + 1}`}
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
