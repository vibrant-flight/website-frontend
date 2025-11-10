"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/AuthProvider";
import { CartView } from "@/utils/cart/CartView";
declare global {
    interface Window {
        Razorpay: any;
    }
}
export default function CheckOut() {
    const [products, setProducts] = useState<CartView>({} as CartView);
    const [mobile, setMobile] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [pinCode, setPinCode] = useState<string>("");
    const deliveryCharge = 50;
    const [totalAmount, setTotalAmount] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const auth = useContext(AuthContext)
    const router = useRouter();
    useEffect(() => {   
        if (products.items) {
            const t = products.items.reduce(
                (sum, product) => sum + product.price * product.quantity,
                0
            );
            setTotalAmount(t);
            setGrandTotal(t + deliveryCharge);
        }
    }, [products]);
    useEffect(() => {
        auth.getData();
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/get-cart-items`,{
            method:"GET",
            headers: {
                "content-type":"application/json",
            },
            credentials:"include"
        }).then((res) => {
            if(res.ok) {
                res.json().then((data)=>{
                    setProducts(data);
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }).catch((err) => {
            alert(err);
        });
    }, []);
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    const handlePayment = async () => {
        alert("We are activelu working on adding payment integration");
        // if (!mobile || !address) {
        //     alert("Please enter mobile number and delivery address");
        //     return;
        // }
        // try {
        //     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/create-order`,{
        //         method:"POST",
        //         headers: {
        //             "content-type":"application/json",
        //         },
        //         body:JSON.stringify({"amount":grandTotal*100}),
        //         credentials:"include"
        //     });
        //     const data = await response.json();
        //     const { order } = data;
        //     const options = {
        //         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        //         amount: order.amount,
        //         currency: "INR",
        //         name: "Vibrant",
        //         description: "Order Payment",
        //         order_id: order.id,
        //         handler: async function (response:any) {
        //             try {
        //                 const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/verify-payment`,{
        //                     method:"POST",
        //                     headers: {
        //                         "content-type":"application/json",
        //                     },
        //                     body:JSON.stringify({order_id: response.razorpay_order_id,
        //                         payment_id: response.razorpay_payment_id,
        //                         signature: response.razorpay_signature,
        //                         mobile:mobile,
        //                         address:address,
        //                         pinCode:pinCode,
        //                         totalAmount:grandTotal,
        //                         userData:auth.userData,
        //                     }),
        //                     credentials:"include",
        //                 });
        //                 const verification = await verifyResponse.json();            
        //                 if (verification.success) {
        //                     await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/clear-cart`,{method:"PATCH",headers: {"content-type":"application/json"},credentials:"include",});
        //                     router.push("/payments/success");
        //                 } 
        //                 else {
        //                     router.push("/payments/failure");
        //                 }
        //             } 
        //             catch (err) {
        //                 console.error("Payment verification error:", err);
        //                 router.push("/payments/failure");
        //             }
        //             },
        //             prefill: {
        //                 name: `${auth.userData.firstName} ${auth.userData.lastName}`,
        //                 email: auth.userData.email,
        //                 contact: mobile,
        //             },
        //             theme: {
        //             color: "#EBD176",       
        //             },
        //             modal: {
        //             ondismiss: function() {
        //                 router.push("/payments/failure");
        //             }
        //         }
        //     };
        //     const rzp = new window.Razorpay(options);
        //     rzp.open();
        // } 
        // catch (err:any) {
        //     alert("Error creating order: " + err.message);
        // }
    };
    const handleCashOnDelivery = async() => {
        try {
            if(!mobile || !address) {
                alert("Please enter mobile number and delivery address");
                return;
            }
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/place-cod-order`,{method:"POST",headers:{"content-type":"application/json"},credentials:"include",body:JSON.stringify({mobile,pinCode,address})});
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/clear-cart`,{method:"PATCH",headers: {"content-type":"application/json"},credentials:"include",});
            router.push("/payments/success");
        }
        catch(err) {
            alert("Place COD failed");
        }
    }
    return (
        <div className="max-w-md mx-auto p-5 rounded-lg shadow transition-colors duration-300 border bg-neutral-900 text-white border-gray-700">
            <h2 className="text-xl font-bold mb-2">Checkout</h2>
            <h3 className="font-semibold mb-2">Products</h3>
            <ul>
                {products.items &&
                products.items.map((product, idx) => (
                    <li key={idx} className="flex justify-between py-1">
                    <span className="flex flex-cols gap-5">
                        <img src={product.image} width={100} loading="lazy" alt="Product" />
                        <span>(Qty: {product.quantity})</span>
                    </span>
                    <span>₹ {(product.price * product.quantity).toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between mt-2 font-semibold">
                <span>Total:</span>
                <span>₹ {totalAmount.toFixed(2)}</span>
            </div>
            <div className="mt-4">
                <label className="block font-semibold mb-1">
                Mobile Number:
                <input
                    type="number"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full mt-1 p-2 rounded border outline-none bg-gray-800 text-white border-gray-600"
                />
                </label>
            </div>
            <div className="mt-4">
                <label className="block font-semibold mb-1">
                Delivery Address:
                <textarea
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full mt-1 p-2 rounded border outline-none  bg-gray-800 text-white border-gray-600"
                />
                </label>
            </div>
            <div className="mt-4">
                <label className="block font-semibold mb-1">
                Pincode:
                <input
                    type="number"
                    placeholder="Enter your Pincode"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="w-full mt-1 p-2 rounded border outline-none bg-gray-800 text-white border-gray-600"
                />
                </label>
            </div>
            <div className="flex justify-between mt-3">
                <span>Delivery Charge:</span>
                <span>₹ {deliveryCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-3 font-bold">
                <span>Grand Total:</span>
                <span>₹ {grandTotal.toFixed(2)}</span>
            </div>
            <button onClick={handlePayment} className="w-full mt-5 py-2 rounded font-semibold transition-colors bg-yellow-700 text-white hover:bg-yellow-600 hover:cursor-pointer">
                Pay Online
            </button>
            <button onClick={handleCashOnDelivery} className="w-full mt-5 py-2 rounded font-semibold transition-colors bg-yellow-700 text-white hover:bg-yellow-600 hover:cursor-pointer">
                Cash On Delivery
            </button>
        </div>
    );
}
