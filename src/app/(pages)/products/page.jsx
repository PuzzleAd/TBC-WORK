"use client";
import apiRequest from "@/functions/apiRequest";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  const handleImageLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiRequest("https://dummyjson.com/products");
        setProducts(data.products);
        setDisplayedProducts(data.products);
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

  const handleInputValue = (e) => {
    const value = e.target.value.toLowerCase();
    if (value.trim() === "") {
      setDisplayedProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(value)
      );
      setDisplayedProducts(filtered);
    }
  };

  const sortText = "Show Menu";

  const handleToggle = () => {
    setToggle(!toggle);
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
      <div className="relative mt-4  w-full flex gap-12">
        <form action="submit" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => handleInputValue(e)}
            className="p-2 w-44 h-8 border border-purple-500 rounded-[6px] outline-none"
          />
        </form>
        <div
          onMouseEnter={handleToggle}
          onMouseLeave={handleToggle}
          className={`absolute z-50 right-0 flex flex-col w-36 border text-black border-purple-500 rounded-[6px] hover:bg-purple-500 transition-.5 hover:text-white`}
        >
          <button className="pt-1 ">{sortText}</button>
          {toggle && (
            <div
              onClick={() => setToggle(false)}
              className="pl-2 top-7 w-full bg-transparent"
            >
              <p className="cursor-pointer my-3 font-bold text-white">
                Sort by Increase
              </p>
              <p className="cursor-pointer my-3 font-bold text-white">
                Sort by Deacrese
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="m-5 flex flex-wrap gap-5">
        {displayedProducts.map((product) => (
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
