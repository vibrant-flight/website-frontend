import { Suspense } from "react";
import ProductsPage from "@/components/ProductsPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPage />
    </Suspense>
  );
}
