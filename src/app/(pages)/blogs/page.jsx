"use client";
import apiRequest from "@/functions/apiRequest";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiRequest("https://dummyjson.com/posts");
        setBlogs(data.posts);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };
    fetchProducts();
  }, []);

  const idArr = [];
  blogs.map((blog) => idArr.push(blog.id));

  

  const handleClick = (id) => {
    router.push(`/blogs/${id}`);
  };

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
