"use client";
import React, { useState } from "react";
import { ItemView } from "@/utils/items/itemView";
import Image from "next/image";
export default function ProductUpload() {
  const [product, setProduct] = useState<ItemView>({
    name: "",
    size: { S: 0, M: 0, L: 0, XL: 0, XXL: 0, XXXL: 0 },
    price: 0,
    actualPrice: 0,
    category: "tshirts",
    fabric: "",
    description: "",
    image: "",
    image1: "",
    image2: "",
    image3: ""
  } as ItemView);
  const [preview, setPreview] = useState<string | null>("");
  const [preview1, setPreview1] = useState<string | null>("");
  const [preview2, setPreview2] = useState<string | null>("");
  const [preview3, setPreview3] = useState<string | null>("");
  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if(e.target instanceof HTMLInputElement && e.target.type === "file" && e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if(file.type !== "image/webp") {
        setError("Only WebP images are allowed.");
        return;
      }
      if(file.size > 100 * 1024) {
        setError("Please upload an image smaller than 100KB.");
        return;
      }
      setError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string | null;
        setProduct((prev) => ({ ...prev, [name]: base64String }));
        if (name === "image") setPreview(base64String);
        else if (name === "image1") setPreview1(base64String);
        else if (name === "image2") setPreview2(base64String);
        else if (name === "image3") setPreview3(base64String);
      };
      reader.readAsDataURL(file);
    } 
    else if (name.startsWith("size-")) {
      const sizeKey = name.split("-")[1];
      setProduct((prev) => ({
        ...prev,
        size: { ...prev.size, [sizeKey]: parseInt(value) || 0 },
      }));
    } 
    else {
      setProduct((prev) => ({
        ...prev,
        [name]: e.target.type === "number" ? parseFloat(value) || 0 : value,
      }));
    }
  };
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (product.name === "") return alert("Name is required");
    if (product.actualPrice === 0) return alert("Actual price cannot be 0");
    if (product.price === 0) return alert("Offer Price cannot be 0");
    if (product.fabric === "") return alert("Fabric cannot be empty");
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admins/add-product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(product)
      })
      if(res.ok) {
        alert("Upload success!");
        setProduct({
          name: "",
          size: { S: 0, M: 0, L: 0, XL: 0, XXL: 0, XXXL: 0 },
          price: 0,
          actualPrice: 0,
          category: "tshirts",
          fabric: "",
          description: "",
          image: "",
          image1: "",
          image2: "",
          image3: ""
        } as ItemView);
        setPreview("");
        setPreview1("");
        setPreview2("");
        setPreview3("");
      }
      else {
        let data = await res.json();
        alert(data.errorMessage)
      }
    } 
    catch (err) {
      alert("Upload failed");
      console.error(err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-neutral-800 rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Upload Product</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-white font-bold mb-1">
          Name:
          <input
            type="text"
            name="name"
            placeholder="Enter Product Name"
            value={product.name}
            onChange={handleChange}
            required
            maxLength={200}
            className="mt-1 block w-full p-2 rounded border border-neutral-300 bg-neutral-900 text-white"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-white font-bold mb-1">
          Item Type:
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="mt-1 block w-full p-2 rounded border bg-neutral-900 text-white"
          >
            <option value="tshirts">tshirts</option>
            <option value="shirts">shirts</option>
            <option value="sweatshirts">sweat shirt</option>
            <option value="hoodies">Hoodies</option>
            <option value="overtees">oversized Ts</option>
          </select>
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-white font-bold mb-1">
          Actual Price:
          <input
            type="number"
            name="actualPrice"
            placeholder="Enter Actual Price"
            value={product.actualPrice}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 rounded border border-neutral-300 bg-neutral-900 text-white"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-white font-bold mb-1">
          Offer Price:
          <input
            type="number"
            name="price"
            placeholder="Enter Offer Price"
            value={product.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 rounded border border-neutral-300 bg-neutral-900 text-white"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-white font-bold mb-1">
          Fabric:
          <input
            type="text"
            name="fabric"
            placeholder="Enter Fabric"
            value={product.fabric}
            onChange={handleChange}
            required
            maxLength={200}
            className="mt-1 block w-full p-2 rounded border border-neutral-300 bg-neutral-900 text-white"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-white font-bold mb-2">Sizes:</label>
        {Object.entries(product.size).map(([sz, val]) => (
          <div key={sz} className="mb-1 flex justify-between items-center">
            <span className="w-12 font-bold text-white">{sz}:</span>
            <input type="number" name={`size-${sz}`} value={val} min="0" onChange={handleChange} className="w-24 p-1 border rounded border-neutral-300 bg-neutral-900 text-white" />
          </div>
        ))}
      </div>  
      <div className="mb-4 relative">
        <label className="block text-white font-bold mb-1">
          Description:
          <textarea
            name="description"
            value={product.description}
            placeholder="Description of the product"
            onChange={(e) => {
              if (e.target.value.length <= 300) {
                handleChange(e);
              }
            }}
            required
            rows={4}
            className="mt-1 block w-full p-2 rounded border border-neutral-300 bg-neutral-900 text-white pr-14"
          />
          <span
            className={`absolute bottom-2 right-2 text-xs ${
              product.description?.length >= 300
                ? "text-red-500 font-semibold"
                : "text-neutral-500"
            }`}
          >
            {product.description?.length}/300
          </span>
        </label>
      </div>
      {["image", "image1", "image2", "image3"].map((img, idx) => (
        <div key={img} className="mb-4">
          <label className="block text-white font-bold mb-1">
            Image {idx + 1}
            {idx === 0 && " (Main)"}:
            <input
              type="file"
              name={img}
              accept="image/webp"
              onChange={handleChange}
              required
              className="mt-1 block w-full text-white file:mr-4 file:py-2 file:px-4  file:rounded-md file:border-0 file:text-sm file:font-semibold  file:bg-neutral-50 file:text-neutral-700 hover:file:bg-neutral-100"
            />
          </label>
          <small className="text-xs text-neutral-500">
            Allowed: .webp only, Max 100KB
          </small>
          {[preview, preview1, preview2, preview3][idx] && typeof [preview, preview1, preview2, preview3][idx] === 'string' && (
            <div className="mt-2 flex justify-center">
              <Image src={[preview, preview1, preview2, preview3][idx] as string} alt="Preview" width={100} height={100} loading="lazy" unoptimized className="max-w-full max-h-48 rounded border border-neutral-200" />
            </div>
          )}
        </div>
      ))}
      <button type="submit" className="w-full py-2 px-4 bg-green-500 hover:cursor-pointer hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-200">
        Upload
      </button>
    </form>
  );
}
