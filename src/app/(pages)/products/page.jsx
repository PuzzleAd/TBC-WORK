"use client";
import apiRequest from "@/functions/apiRequest";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  const handleImageLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiRequest("https://dummyjson.com/products");
        setProducts(data.products);
        setPageLoading(false);
      } catch (error) {
        console.error(`Error: ${error}`);
        setPageLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleClick = (id) => {
    router.push(`/products/${id}`);
  };

  if (pageLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="py-10 px-20 flex flex-col items-center">
      <h1 className="text-[purple]">PRODUCTS</h1>
      <div className="m-5 flex flex-wrap gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative w-36 flex flex-col justify-between gap-3"
            onClick={() => handleClick(product.id)}
          >
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
                <span className="loader">Loading...</span>{" "}
              </div>
            )}
            <div className="relative w-full h-32">
              <Image
                src={product.images[0]}
                alt={product.title}
                layout="fill"
                objectFit="contain"
                onLoadingComplete={handleImageLoad}
              />
            </div>
            <h1 className="text-center">{product.title}</h1>
            <p>{product.brand}</p>
            <div className="flex justify-between">
              <p>{product.price}$</p>
              <p>Rating: {product.rating}</p>
            </div>
            <button className="w-full h-8 bg-[purple] text-white text-3 rounded-[6] hover:opacity-[.5] duration-500">
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
