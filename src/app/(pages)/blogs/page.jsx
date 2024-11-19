"use client";
import apiRequest from "@/functions/apiRequest";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiRequest("https://dummyjson.com/posts");
        setBlogs(data.posts);
        setLoading(false);
      } catch (error) {
        console.error(`Error: ${error}`);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleClick = (id) => {
    router.push(`/blogs/${id}`);
  };
  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="py-10 px-20 flex flex-col gap-5">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="cursor-pointer bg-[purple] p-4 rounded-md"
          onClick={() => handleClick(blog.id)}
        >
          <h1 className="text-white">{blog.title}</h1>
          <p className="mt-3 text-white">{blog.body}</p>
        </div>
      ))}
    </div>
  );
}
