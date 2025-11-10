"use client";
import { OrderView } from "@/utils/orders/OrderView";
import React, { useEffect, useState } from "react";
export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderView[]>([] as OrderView[]);
  const [trackingIds, setTrackingIds] = useState<Record<string,string>>({});
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admins/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    }).then((res) => {
      if(res.ok) {
        res.json().then((data)=>{
          setOrders(data);
        }).catch((err)=>{
          console.log(err);
        })
      }
    }).catch((err) => {
      alert(err.message);
    });
  }, []);
  const dispatchOrder = (orderId:string) => {
    const tid = trackingIds[orderId];
    if (!tid || tid.trim() === "") {
      alert("Tracking ID can't be left empty");
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admins/dispatch`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({orderId,trackingId:tid}),
      credentials: 'include',
    }).then((res) => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admins/orders`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        }).then((res) => {
            setOrders((prev) =>
              prev.map((order) =>
                order.orderId === orderId
                ? { ...order, trackingId: tid, status: "dispatched" }
                : order
              )
            );
        });
      }).catch((err) => {
        alert(err.message);
      });
  };
  const cancelOrder = (orderId:string) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admins/cancel-order`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({orderId}),
      credentials: 'include',
    }).then((res) => {
      if(res.ok) {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admins/orders`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        }).then((res) => {
          if(res.ok) {
            res.json().then((data)=>{
              setOrders(data);
            }).catch((err)=>{
              console.log(err);
            })
          }
        }).catch((err) => {
          alert(err.message);
        });
      }
    }).catch((err) => {
      alert(err.message);
    });
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-700 dark:text-white rounded-lg">
          <thead className="bg-neutral-800 text-white">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Payment ID</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Mobile</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Pin Code</th>
              <th className="px-4 py-2">Items</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Tracking Id</th>
              <th className="px-4 py-2">Dispatch</th>
            </tr>
          </thead>
          <tbody className="dark:bg-neutral-700 dark:text-white">
            {orders &&
              orders.map((order) => (
                <tr key={order.orderId}>
                  <td className="px-4 py-2">{order.orderId}</td>
                  <td className="px-4 py-2">{order.paymentId}</td>
                  <td className="px-4 py-2">{order.email}</td>
                  <td className="px-4 py-2">{order.mobile}</td>
                  <td className="px-4 py-2">{order.address}</td>
                  <td className="px-4 py-2">{order.pinCode}</td>
                  <td className="px-4 py-2">
                    <ul>
                      {order.items.map((item) => (
                        <li
                          key={item.itemId}
                          className="flex flex-row items-center justify-around px-4"
                        >
                          <img src={item.image} width={100} className="p-2" />
                          <ul>
                            <li className="flex flex-row gap-2">
                              <div>x</div> <div>{item.quantity}</div>
                            </li>
                            <li>{item.selectedSize}</li>
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2">{order.amount}</td>
                  <td className="px-4 py-2">{order.status}</td>
                  <td className="px-4 py-2">{order.trackingId}</td>
                  <td className="px-4 py-2">
                    {order.status === "captured" ? (
                      <div className="flex flex-col">
                        <div className="flex-row">
                          <input
                            type="text"
                            name="trackingId"
                            value={trackingIds[order.orderId] || ""}
                            onChange={(e) =>
                              setTrackingIds({
                                ...trackingIds,
                                [order.orderId]: e.target.value,
                              })
                            }
                            className="border-2 border-black"
                          />
                        </div>
                        <div className="flex flex-row gap-3 mt-2">
                          <button
                            onClick={() => dispatchOrder(order.orderId)}
                            className="bg-green-700 text-white px-3 hover:cursor-pointer hover:bg-green-800"
                          >
                            Dispatch
                          </button>
                          <button
                            onClick={() => cancelOrder(order.orderId)}
                            className="bg-red-700 text-white px-3 hover:cursor-pointer hover:bg-red-800"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>{order.status}</>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
