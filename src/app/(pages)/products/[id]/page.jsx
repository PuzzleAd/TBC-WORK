"use client";
import apiRequest from "@/functions/apiRequest";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function page() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoad, setImageLoad] = useState(true);
  const { id } = useParams();

  const handleImageLoad = () => {
    setImageLoad(false);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await apiRequest(`https://dummyjson.com/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(`Error: ${error}`);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  console.log(product);

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="w-full h-full flex items-center justify-center gap-12">
      <div className="relative">
        {imageLoad && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
            <span className="loader">Loading...</span>{" "}
          </div>
        )}
        <Image
          src={product.images[0]}
          alt={product.title}
          width={200}
          height={400}
          onLoadingComplete={handleImageLoad}
        />
      </div>
      <div className="flex flex-col gap-6">
        <h1>{product.title}</h1>
        <h3>BRAND: {product.brand}</h3>
        <p className="w-64">{product.description}</p>
        <div className="flex justify-between">
          <p className="text-base text-bold">{product.price}$</p>
          <p className="text-base text-bold">Rating: {product.rating}</p>
        </div>
        <button className="w-[100px] h-[40px] bg-[purple] text-white rounded-md hover:opacity-[.5] duration-500">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
