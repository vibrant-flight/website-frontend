'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { ItemView } from '@/utils/items/itemView'
import { redirect, useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
export default function ProductPage() {
    const [product, setProduct] = useState<ItemView>({} as ItemView);
    const router = useRouter();
    const [selectedProduct,setSelectedProduct] = useState({
        itemId:product.itemId,
        selectedSize:"",
        quantity:0,
    });
    const {productId} = useParams();
    const imageList = [product.image,product.image1,product.image2,product.image3].filter((img) => typeof img === "string" && img.trim() !== "");
    const [selectedImage, setSelectedImage] = useState<number>(0);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/items/${productId}`,{method:"GET",headers:{"content-type":"application/json"}}).then((res)=>{
            if(res.ok) {
                res.json().then((data)=>{
                    setProduct(data);
                    setSelectedProduct((prev)=>({
                        ...prev,
                        itemId:data.itemId
                    }))
                })
            }
            else {
                router.back();
            }
        })
    }, [productId]);
    const addTocart = () => {
        if(selectedProduct.quantity>0) {
            if(selectedProduct.selectedSize!="") {
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/add-to-cart`,
                    {
                        method:"POST",
                        headers:{
                            "content-type":"application/json"
                        },
                        credentials:"include",
                        body:JSON.stringify(selectedProduct),
                    }
                ).then((res)=>{
                    if(res.ok) {
                        router.push("/users/cart");
                    }
                    else {
                        res.json().then((data)=>{
                            alert(data.errorMessage);
                        })
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            }
            else {
                alert("Please select size");
            }
        }
        else {
            alert("please select quantity");
        }
    }
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-800">
                            {imageList[selectedImage] && (
                                <Image src={imageList[selectedImage]} alt={product.name || ''} fill className="object-fit" priority />
                            )}
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {imageList.filter(img => img).map((img, idx) => (
                                <button key={idx} onClick={() => setSelectedImage(idx)} className={`relative aspect-square rounded-md overflow-hidden ${selectedImage === idx ? 'ring-2 ring-blue-500' : ''}`}>
                                    <Image src={img} alt={`Product ${idx + 1}`} fill className="object-fit" />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <div className="flex items-baseline space-x-4">
                            {typeof product.actualPrice === 'number' && typeof product.price === 'number' && product.actualPrice > product.price ? (
                            <>
                                <span className="text-lg text-gray-400 line-through">₹{product.actualPrice.toFixed(2)}</span>
                                <span className="text-2xl font-bold">₹{product.price.toFixed(2)}</span>
                            </>
                            ) : (
                                <span className="text-2xl font-bold">₹{(product.price ?? product.actualPrice ?? 0).toFixed(2)}</span>
                            )}
                        </div>
                        <p className="text-gray-400">{product.description}</p>
                        <div className="space-y-4">
                            {(() => {
                                const entries = Object.entries(product.size || {});
                                const hasAnySize = entries.length > 0;
                                const soldOut = !hasAnySize || entries.every(([, qty]) => (qty ?? 0) <= 0);
                                if (soldOut) {
                                    return (
                                        <div className="text-red-400 font-semibold">Sold out</div>
                                    );
                                }
                                return (
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-wrap gap-2">
                                            {entries.map(([size, qty]) => (
                                                <button key={size} type="button" 
                                                    onClick={()=>setSelectedProduct((prev)=>({...prev,quantity:0,selectedSize:size}))}
                                                    disabled={(qty ?? 0) <= 0}
                                                    className={`px-3 py-1 rounded-md border-3 ${
                                                    (qty ?? 0) > 0
                                                        ? 'bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700'
                                                        : 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed opacity-60'
                                                    } ${selectedProduct.selectedSize==size? 'border-green-700': ''}`}
                                                >
                                                    {size} 
                                                </button>
                                            ))}
                                        </div>
                                        {(() => {
                                            const sizeMap = (product.size as Record<string, number> | undefined) || {};
                                            const available = selectedProduct.selectedSize?(sizeMap[selectedProduct.selectedSize] ?? 0):0;

                                            const qty = selectedProduct.quantity ?? 0;

                                            return (
                                                <div className="space-y-4 w-full">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-sm text-gray-400">Quantity</span>
                                                        <div className="flex items-center border border-gray-700 rounded-md overflow-hidden">
                                                            <button type="button" aria-label="Decrease quantity"
                                                                onClick={() =>
                                                                    setSelectedProduct(prev => ({
                                                                        ...prev,
                                                                        quantity: Math.max(0, (prev.quantity ?? 0) - 1),
                                                                    }))
                                                                }
                                                                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
                                                                disabled={qty <= 0}
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="number"
                                                                min={0}
                                                                max={available}
                                                                value={qty}
                                                                onChange={e => {
                                                                    const val = Math.max(0, Math.min(available, Number(e.target.value) || 0));
                                                                    setSelectedProduct(prev => ({ ...prev, quantity: val }));
                                                                }}
                                                                className="w-14 text-center bg-gray-900 px-2 py-1 outline-none"
                                                            />
                                                            <button type="button" aria-label="Increase quantity"
                                                                onClick={() =>
                                                                    setSelectedProduct(prev => {
                                                                        const next = (prev.quantity ?? 0) + 1;
                                                                        return { ...prev, quantity: Math.min(next, available) };
                                                                    })
                                                                }
                                                                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
                                                                disabled={qty >= available || available <= 0}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <span className="text-sm text-gray-400">Available: {available}</span>
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                        <button onClick={addTocart} className="w-full bg-yellow-600 hover:bg-yellow-700 hover:cursor-pointer text-white px-6 py-2 rounded-md transition-colors">
                                            Add to Cart
                                        </button>
                                    </div>
                                );
                            })()}   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
