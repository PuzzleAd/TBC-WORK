"use client";
import apiRequest from "@/functions/apiRequest";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await apiRequest(`https://dummyjson.com/posts/${id}`);
        setBlog(data);
        setLoading(false);
      } catch (error) {
        console.error(`Error: ${error}`);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);
  console.log(blog);

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col gap-6 items-center p-6 border-2 border-purple-700 rounded-md">
        <h1>{blog.title}</h1>
        <p className="w-[400px] text-center">{blog.body}</p>
      </div>
    </div>
  );
}
