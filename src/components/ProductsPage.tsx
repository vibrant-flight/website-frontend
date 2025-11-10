"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ItemView } from "@/utils/items/itemView";
import Image from "next/image";

export default function Products() {
    const location = useSearchParams();
    const router = useRouter();
    const category = location.get("category") || "tshirts";
    const [products, setProducts] = useState<ItemView[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        setProducts([]);
        setPage(1);
        setHasMore(true);
        loadProducts(1, true);
    }, [category]);

    const loadProducts = (pageToLoad: number, isInitial = false) => {
        setIsLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-items?category=${category}&page=${pageToLoad}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(async (res) => {
            if (res.ok) {
                let data = await res.json();
                const newProducts = data || [];
                if (isInitial) {
                    setProducts(newProducts);
                } else {
                    setProducts((prev) =>[...prev, ...newProducts].filter((v, i, arr) =>
                        arr.findIndex(x => x.itemId === v.itemId) === i
                    ));
                }
                if (newProducts.length === 0 || newProducts.length < 8) {
                    setHasMore(false);
                }
            }
        }).catch((err) => console.log("Error:", err)).finally(() => setIsLoading(false));
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        loadProducts(nextPage);
    };

    const categories = [
        { key: "tshirts", label: "T-Shirts" },
        { key: "shirts", label: "Shirts" },
        { key: "sweatshirts", label: "SweatShirts" },
        { key: "hoodies", label: "Hoodies" },
        { key: "overtees", label: "Oversized T-Shirts" }
    ];
    function selectCategory(catKey: string) {
        if (catKey === "all") router.push("/products");
        else router.push(`/products?category=${encodeURIComponent(catKey)}`);
    }

    return (
        <div className="bg-neutral-800 flex min-h-screen">
            <main className="flex-1 flex flex-col items-center px-4 py-6 z-0 w-full">
                <div className="w-full flex justify-around overflow-x-auto gap-4 mb-6 px-2 py-2 scroll-smooth scrollbar-hide">
                    {categories.filter(c => c.key !== "all").map(({ key, label }) => {
                        const isSelected = category === key;
                        const fileName = `${key.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/gi, "")}.webp`;
                        return (
                            <div key={key} className="shrink-0 flex flex-col items-center text-white">
                                <button onClick={() => selectCategory(key)}
                                    className={`rounded-full p-1 transition ${
                                        isSelected ? "ring-2 ring-white" : ""
                                    }`}>
                                    <Image
                                        src={`/categories/${fileName}`}
                                        alt={label}
                                        width={70}
                                        height={70}
                                        className="rounded-full object-cover w-16 h-16 hover:cursor-pointer"
                                    />
                                </button>
                                <span className="text-xs mt-1">{label}</span>
                            </div>
                        );
                    })}
                </div>
                <div className="m-auto grid gap-6 w-full max-w- grid-cols- sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {isLoading && products.length === 0 ? (
                        Array(8).fill(null).map((_, i) => (
                            <div key={i} className="flex flex-col items-center bg-neutral-700 rounded-xl shadow-lg overflow-hidden w-full animate-pulse aspect-auto">
                                <div className="w-full h-40 bg-neutral-600" />
                                <div className="w-full px-4 py-2">
                                    <div className="h-4 bg-neutral-500 rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-neutral-500 rounded w-1/2 mx-auto" />
                                </div>
                            </div>
                        ))
                    ) : products && products.length > 0 ? (
                        products.map((product) => (
                            <Link key={product.itemId} href={`/products/${product.itemId}`}>
                                <div className="group flex flex-col items-center bg-neutral-700 rounded-xl shadow-xl overflow-hidden w-full transition hover:scale-[1.03] aspect-auto">
                                    <div className="relative w-full h-44 md:h-52 lg:h-56 xl:h-60 overflow-hidden">
                                        {product.size.S==0 && product.size.M==0 && product.size.L==0 && product.size.XL==0 && product.size.XL==0 && product.size.XXXL==0 ? 
                                            (
                                                <span className="absolute top-2 right-2 z-20 px-3 py-1 text-xs font-bold rounded-full bg-red-700 text-white shadow-md">Sold Out</span>
                                            ):(<></>)
                                        }
                                        <Image src={product.image} alt={product.name} loading="lazy" fill sizes="(max-width:600px) 45vw, 18vw" className="object-cover w-full h-full transition group-hover:scale-[1.08]" />
                                    </div>
                                    <div className="bg-neutral-600 text-white w-full text-center px-2 py-3">
                                        <h3 className="text-base font-bold truncate">{product.name}</h3>
                                        <div className="flex flex-row gap-3 justify-center mt-2">
                                            <p className="text-sm line-through font-bold text-yellow-300">₹ {product.actualPrice}</p>
                                            <p className="text-sm font-bold text-yellow-400">₹ {product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center col-span-full text-neutral-300 w-full py-10 text-xl font-semibold">
                            Coming Soon
                        </div>
                    )}
                </div>
                {hasMore && (
                    <button onClick={handleLoadMore} disabled={isLoading}
                        className="mt-8 px-7 py-2.5 bg-neutral-700 text-white rounded-lg shadow hover:bg-neutral-600 transition disabled:opacity-45 font-bold text-base"
                    >
                        {isLoading ? "Loading..." : "Load More"}
                    </button>
                )}
            </main>
        </div>
    );
}
