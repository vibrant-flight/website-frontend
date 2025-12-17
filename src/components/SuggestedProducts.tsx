"use client";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft,faChevronRight,} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "./AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { ItemView } from "@/utils/items/itemView";
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
            <div className="relative max-w-5xl mx-auto">
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
                            <div className="group flex bg-neutral-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition min-h-[260px]">
                                <div className="relative w-[220px] sm:w-[260px] shrink-0">
                                    {soldOut && (
                                        <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                                            Sold Out
                                        </span>
                                    )}
                                    <Image src={product.image} alt={product.name} fill className="object-fit group-hover:scale-105 transition-transform duration-300"/>
                                </div>
                                <div className="flex flex-col justify-center px-6 py-5 text-white flex-1">
                                    <span className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                                        {product.category}
                                    </span>
                                    <h3 className="text-xl font-bold leading-tight mb-3">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-sm text-gray-400 line-through">
                                            ₹ {product.actualPrice}
                                        </span>
                                        <span className="text-2xl font-extrabold text-yellow-400">
                                            ₹ {product.price}
                                        </span>
                                    </div>
                                    <div className="h-px bg-neutral-700 mb-4" />
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-300">
                                            Premium {product.fabric}
                                        </span>

                                        <span className="text-sm font-semibold text-yellow-300 group-hover:translate-x-1 transition">
                                            View product →
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
