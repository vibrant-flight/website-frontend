// import { ItemView } from "@/utils/items/itemView";

// export default async function sitemap() {
//   const baseUrl = "https://vibrantflight.in";
//   const products = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-items`).then(r => r.json());

//   const productUrls = products.map((p:ItemView) => ({
//     url: `${baseUrl}/products/${p.itemId}`,
//     lastModified: new Date(),
//   }));

//   return [
//     {
//       url: baseUrl,
//       lastModified: new Date(),
//     },
//     {
//         url: baseUrl+"/about-us",
//         lastModified: new Date(),
//     },
//     {
//         url: baseUrl+"/return-or-cancellation",
//         lastModified: new Date(),
//     },
//     {
//         url: baseUrl+"/users/login",
//         lastModified: new Date(),
//     },
//     {
//         url: baseUrl+"/users/register",
//         lastModified: new Date(),
//     },
//     ...productUrls,
//   ];
// }
export default async function sitemap() {
    return [
        {
            url: "https://vibrantflight.in",
            lastModified: new Date(),
        }
    ]
}