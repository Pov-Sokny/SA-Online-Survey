"use client";

import { useGetProductsQuery } from "@/redux/services/faskStoreApi"
import ProductCard from "@/components/ProductCard";
import HomePage from "@/components/HomePage";

export default function ProductsPage() {
  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div>
      {/* <h1>Products</h1>
      {data?.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}/ */}
      
         <HomePage/>
    </div> 
   
  );
}
