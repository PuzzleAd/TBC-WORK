import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className="w-full bg-[purple] py-5 px-8 flex justify-between">
      <nav className="flex gap-4 text-white">
        <Link href={"/"}>Home</Link>
        <Link href={"/products"}>Products</Link>
        <Link href={"/blogs"}>Blogs</Link>
        <Link href={"/contact"}>Contact</Link>
        <Link href={"/profile"}>Profile</Link>
      </nav>
    </div>
  )
}
