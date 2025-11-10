"use client";
import { CartItemView } from "@/utils/cart/CartView";
import { OrderView } from "@/utils/orders/OrderView";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function Orders() {
  const [orders, setOrders] = useState<OrderView[]>([] as OrderView[]);
  const [editingOrderId, setEditingOrderId] = useState<string>("");
  const [newAddress, setNewAddress] = useState<string>("");
  const [pinCode,setPinCode] = useState<string>("");
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/orders`,{
      method:"GET",
      headers:{
        "content-type":"application/json"
      },
      credentials:"include",
    }).then((res) => {
      res.json().then((data)=>{
        const ordersArray = Array.isArray(data) ? data : [data];
        setOrders(ordersArray);
      });
    }).catch((err) => {
      alert(err.message);
    });
  }, []);
  const handleAddressSave = async (orderId:string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/update-order-service`,{
        method:"PUT",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({orderId,newAddress,pinCode}),
        credentials:"include",
      })
      setOrders((prevOrders) =>
        prevOrders.map((o:any) =>
          o.orderId === orderId || o.id === orderId || o._id === orderId
            ? { ...o, address: newAddress }
            : o
        )
      );
      setEditingOrderId("");
      setNewAddress("");
      alert("Address updated successfully!");
    } 
    catch (err:any) {
      alert(err.message);
    }
  };
  if(!orders) return <p className="text-white">Loading...</p>;
  return (
    <div className="container mx-auto px-4 py-6">
      {orders.length === 0 ? (
        <p className="text-white text-center text-lg">No orders found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {orders.map((order) => {
            let statusStyle = "text-neutral-800 bg-neutral-800 text-neutral-200";
            let statusLabel:string = order.status || "N/A";
            if (order.status === "captured") {
              statusStyle = "text-yellow-400 bg-yellow-900 text-yellow-200";
              statusLabel = "Processed";
            } else if (order.status === "cancelled") {
              statusStyle = "text-red-400 bg-red-900 text-red-200";
              statusLabel = "Cancelled";
            } else if (order.status === "dispatched") {
              statusStyle = "text-green-400 bg-green-900 text-green-200";
              statusLabel = "Dispatched";
            }
            const orderKey = order.orderId;
            return (
              <div key={orderKey} className="bg-neutral-950 rounded-lg shadow-xl p-4 md:p-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-lg font-semibold text-neutral-100">Order #{orderKey}</div>
                    <div className={`px-3 py-1 rounded-full text-sm ${statusStyle}`}>{statusLabel}</div>
                  </div>

                  <div className="flex flex-col gap-2 text-sm md:text-base">
                    <div className="text-neutral-300">
                      <span className="font-medium">Total:</span> ₹ {order.amount || "N/A"}
                    </div>
                    <div className="text-neutral-300">
                      <span className="font-medium">TrackingId:</span> {order.trackingId || "N/A"}
                    </div>
                    <div className="text-neutral-300">
                      <span className="font-medium">Address:</span>{" "}
                      {editingOrderId === orderKey ? (
                      <div className="mt-2 space-y-2">
                        <textarea value={newAddress} onChange={(e) => setNewAddress(e.target.value)} className="w-full p-2 rounded bg-neutral-800 text-white text-sm resize-none"  rows={2} placeholder="Enter new address" />
                        <input type="text" value={pinCode} onChange={(e)=>setPinCode(e.target.value)} className="w-full p-2 rounded bg-neutral-800 text-white text-sm" placeholder="Enter PIN code" maxLength={6} />
                        <div className="flex gap-2">
                          <button onClick={() => handleAddressSave(orderKey)} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm">
                            Save
                          </button>
                          <button onClick={() => {setEditingOrderId(""); setNewAddress(""); setPinCode("");}} className="px-4 py-2 bg-neutral-400 hover:bg-neutral-500 text-white rounded-md text-sm">
                            Cancel
                          </button>
                        </div>
                      </div>
                      ) : (
                      <div>
                        <div className="wrap-break-word">{order.address || "N/A"}</div>
                        <div className="text-sm">PIN: {order.pinCode || "N/A"}</div>
                      </div>
                      )}
                    </div>
                    {statusLabel === "Processed" && editingOrderId !== orderKey && (
                      <button onClick={() => {setEditingOrderId(orderKey); setNewAddress(order.address || "");}} 
                        className="w-fit px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm">
                        Change Address
                      </button>
                    )}
                  </div>

                  <div className="space-y-3 mt-4">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item: CartItemView) => (
                        <div key={item.itemId} className="flex gap-3 bg-neutral-700 rounded-lg p-3">
                          <Image
                            src={item.image || "https://via.placeholder.com/60"}
                            alt="Product"
                            loading="lazy"
                            className="w-20 h-20 object-cover rounded-md"
                            width={100}
                            height={100}
                          />
                          <div className="flex flex-col justify-center space-y-1 text-sm">
                            <div className="text-neutral-300">Price: ₹{item.price || "N/A"}</div>
                            <div className="text-neutral-300">Qty: {item.quantity || 1}</div>
                            {item.selectedSize && (
                              <div className="text-neutral-300">Size: {item.selectedSize}</div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-white text-center">No items in this order.</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
