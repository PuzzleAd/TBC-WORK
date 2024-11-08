"use client";
import apiRequest from "@/functions/apiRequest";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiRequest("https://dummyjson.com/products");
        setProducts(data.products);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };
    fetchProducts();
  }, []);

  console.log(products);
  return (
    <div className="py-10 px-20 flex flex-col items-center">
      <h1 className="text-[purple]">PRODUCTS</h1>
      <div className="m-5 flex flex-wrap gap-5">
        {products.map((product) => (
          <div key={product.id} className="relative w-36 flex flex-col justify-between gap-3">
            <div className="relative w-full h-32">
            <Image
              src={product.images[0]}
              alt={product.title}
              layout="fill"
              objectFit="contain" 
            />
          </div>
            <h1 className="text-center">{product.title}</h1>
            <p>{product.brand}</p>
            <div className="flex justify-between">
              <p>{product.price}$</p>
              <p>Rating: {product.rating}</p>
            </div>
            <button className="w-full h-8 bg-[purple] text-white text-3 rounded-[6] hover:opacity-[.5] duration-500">See Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}
