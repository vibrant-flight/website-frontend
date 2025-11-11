'use client';
import { Carousel } from 'react-responsive-carousel'; 
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ItemView } from '@/utils/items/itemView';
import Link from 'next/link';
const images = [
  '/carousel/1.jpg',
  '/carousel/2.jpg',
  '/carousel/3.jpg',
  '/carousel/4.jpg',
]
export default function Home() {
  const [products,setProducts] = useState<ItemView[]>([] as ItemView[]);
  const loadProducts = (isInitial = false) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-items`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(async (res) => {
      if (res.ok) {
        let data = await res.json();
        const newProducts = data || [];
        if(isInitial) {
          setProducts(newProducts);
        } 
        else {
          setProducts((prev) => [...prev, ...newProducts].filter((v, i, arr) =>
            arr.findIndex(x => x.itemId === v.itemId) === i
          ));
        }
      }
    }).catch((err) => console.log("Error:", err));
  };
  useEffect(()=>{
    loadProducts();
  },[])
  return (
    <>
      <Carousel showThumbs={false} showArrows={true} showIndicators={false} autoPlay={true} infiniteLoop>
        {images.map((src, idx) => (
          <div key={idx}>
            <Image src={src} alt={`Carousel image ${idx + 1}`} width={500} height={100} className='w-100 h-100 md:h-150' />
          </div>
        ))}
      </Carousel>
      <div className="bg-neutral-800 w-fit mx-auto my-5 text-yellow-300 text-center rounded-full px-6 font-bold">
        DROP I Live NOW
      </div>
      <div className="flex flex-row justify-evenly overflow-x-auto gap-4 py-2 px-2 md:justify-evenly scrollbar-hide">
        <div className='text-white flex flex-col items-center min-w-[100px]'>
          <Link href={"/products?category=tshirts"}>
            <Image src="/categories/tshirts.webp" width={100} height={100} alt="Tshirts" className="rounded-full w-24 h-24 overflow-hidden hover:cursor-pointer" />
          </Link>
          Tshirts
        </div>
        <div className='text-white flex flex-col items-center min-w-[100px]'>
          <Link href={"/products?category=shirts"}>
            <Image src="/categories/shirts.webp" width={100} height={100} alt='Shirts' className='rounded-full w-24 h-24 overflow-hidden hover:cursor-pointer'></Image>  
          </Link>
          Shirts
        </div>
        <div className='text-white flex flex-col items-center min-w-[100px]'>
          <Link href={"/products?category=sweatshirts"}>
            <Image src="/categories/sweatshirts.webp" width={100} height={100} alt='Sweatshirts' className='rounded-full w-24 h-24 overflow-hidden hover:cursor-pointer'></Image>
          </Link>
          Sweatshirts
        </div>
        <div className='text-white flex flex-col items-center min-w-[100px]'>
          <Link href={"/products?category=hoodies"}>
            <Image src="/categories/hoodies.webp" width={100} height={100} alt='Hoodies' className='rounded-full w-24 h-24 overflow-hidden hover:cursor-pointer'></Image>
          </Link>
          Hoodies
        </div>
        <div className='text-white flex flex-col items-center min-w-[100px]'>
          <Link href={"/products?category=overtees"}>
            <Image src="/categories/overtees.webp" width={100} height={100} alt="Oversized T's" className='rounded-full w-24 h-24 overflow-hidden hover:cursor-pointer'></Image>
          </Link>
          OverSized T's
        </div>
      </div>
      <div className="m-auto grid gap-6 w-full max-w-7xl grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products && products.length > 0 ? (
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
    </>
  )
} 
