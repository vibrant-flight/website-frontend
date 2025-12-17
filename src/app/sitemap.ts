import { ItemView } from "@/utils/items/itemView";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://vibrantflight.in";
  let products: ItemView[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-items`,{ cache: "no-store" });
    const data = await res.json();
    if(Array.isArray(data)) {
      products = data;
    }
    else if(Array.isArray(data?.items)) {
      products = data.items;
    } 
    else {
      products = [];
    }
  } 
  catch (err) {
    console.error("Sitemap product fetch failed:", err);
  }
  const productUrls = products.map((p) => ({
    url: `${baseUrl}/products/${p.itemId}`,
    lastModified: new Date(),
  }));
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/products?category=tshirts`, lastModified: new Date() },
    { url: `${baseUrl}/products?category=shirts`, lastModified: new Date() },
    { url: `${baseUrl}/products?category=sweatshirts`, lastModified: new Date() },
    { url: `${baseUrl}/products?category=overtees`, lastModified: new Date() },
    { url: `${baseUrl}/about-us`, lastModified: new Date() },
    { url: `${baseUrl}/return-or-cancellation`, lastModified: new Date() },
    { url: `${baseUrl}/users/login`, lastModified: new Date() },
    { url: `${baseUrl}/users/register`, lastModified: new Date() },
    ...productUrls,
  ];
}
