import React from "react";

export default function page() {
  return (
    <form className="w-full h-full flex flex-col items-center justify-center gap-2">
      <input
        type="email"
        className="w-[200px] p-[6px] border border-purple-500 rounded-md placeholder:text-[12px] text-[12px] outline-none"
        placeholder="Write your Email"
      />
      <textarea
        type=""
        className="w-[200px] h-[160px] border border-purple-500 rounded-md p-2 placeholder:text-[12px] text-[12px] outline-none"
        placeholder="Send us your Problem"
      />
      <button
        type="submit"
        className="w-[200px] py-[6px] text-white rounded-[6px] bg-[purple] hover:opacity-[.5] duration-500"
      >
        Send
      </button>
    </form>
  );
}
