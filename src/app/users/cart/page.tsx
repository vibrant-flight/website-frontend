"use client";
import { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartView } from "@/utils/cart/CartView";
export default function Cart() {
    const [cart, setCart] = useState<CartView>({} as CartView);
    const router = useRouter();
    useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/get-cart-items`,{
        method:"GET",
        headers:{
          "content-type":"application/json"
        },
        credentials:"include",
      }).then((res)=>{
        res.json().then((data)=>{
          setCart(data);
        }).catch((err)=>{
          console.log(err);
        })
      }).catch((err)=>{
        console.log (err);
      })
    }, []);
    const handleQuantityChange = async (itemId:string, selectedSize:string, delta:number) => {
        try {
            let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/add-to-cart`,{
              method:"POST",
              headers:{
                "content-type":"application/json"
              },
              credentials:"include",
              body:JSON.stringify({itemId,selectedSize,quantity: delta})
            })
            if(!res.ok) {
              let data = await res.json();
              alert(data.errorMessage);
            }
            else {
              setCart((prevCart) => {
                  const updatedItems = prevCart.items.map((item) => {
                      if (item.itemId === itemId && item.selectedSize === selectedSize) {
                          const newQuantity = Math.max(1, item.quantity + delta);
                          return { ...item, quantity: newQuantity };
                      }
                      return item;
                  });
                  return { ...prevCart, items: updatedItems };
              });
            }
        } 
        catch (err: any) {
            if (err.response && err.response.data && err.response.data.errorMessage) {
                alert(err.response.data.errorMessage);
            } 
            else {
                alert("An error occurred");
            }
        }
    };
    const checkOut = () => {
        if(Object.keys(cart).length === 0) {
            alert("Your cart is empty");
        }
        else {
            router.push("/users/checkout");
        }
    }
    const remove = (itemId:string,size:string) => {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/remove-item`,{
        method:"PUT",
        headers:{
          "content-type":"application/json"
        },  
        credentials:"include",
        body:JSON.stringify({itemId,size})
      }).then((res) => {
        if(res.ok) {
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/get-cart-items`,{
            method:"GET",
            headers:{
              "content-type":"application/json"
            },
            credentials:"include",
          }).then((res)=>{
            res.json().then((data)=>{
              setCart(data);
            }).catch((err)=>{
              console.log(err);
            })
          }).catch((err)=>{
            console.log (err);
          })
        }
      }).catch((err) => {
        console.error(err);
      });
    };
    if (!cart) return <div className="dark:text-white">Loading...</div>;
    const subtotal = cart.items?cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;

    return (
        <div className="max-w-sm mx-auto mt-10 border border-neutral-700 rounded-lg p-6 bg-neutral-900 shadow-md">
            <h2 className="mb-5 text-2xl font-semibold text-gray-100">Your Cart</h2>
            {cart.items && cart.items.length > 0 ? (
                cart.items.map((item) => (
                    <div key={item.itemId} className="flex items-center mb-6">
                        <img src={item.image} alt={item.itemId} loading="lazy" className="w-24 h-30 object-cover rounded-md mr-5" />
                        <div className="flex-1">
                            <div className="my-2 text-gray-300">
                              {item.name}
                            </div>
                            <div className="my-2 text-gray-300">
                              Size: <b>{item.selectedSize}</b>
                            </div>
                            <div className="my-2 text-gray-300">
                                Price: <b>₹ {item.price}</b>
                            </div>
                            <div className="flex items-center mt-3">
                                <button onClick={() => handleQuantityChange(item.itemId, item.selectedSize, -1)} className="w-7 h-7 text-lg rounded-full border border-gray-600 bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-700 transition">
                                    -
                                </button>
                                <span className="mx-4 text-base text-gray-900 dark:text-gray-100">{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item.itemId, item.selectedSize, 1)} className="w-7 h-7 text-lg rounded-full border border-gray-600 bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-700 transition">
                                    +
                                </button>
                            </div>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faTrash} onClick={() => remove(item.itemId,item.selectedSize)} className="p-3 rounded-full text-white hover:text-red-800 hover:cursor-pointer" />
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-white">Your cart is empty</div>
            )}
            <div>
                <span className="text-2xl text-white font-bold">
                    Sub Total
                </span>
                <span className="text-2xl text-white"> ₹ {subtotal} </span>
            </div>   
            <button onClick={checkOut} className="bg-black text-white w-full text-center mt-5 hover:bg-neutral-800 transition-all duration-500">
                Check Out
            </button>
        </div>
    );
}
