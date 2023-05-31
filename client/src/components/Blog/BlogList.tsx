import { listItem } from "./../NavList/fnhelper";
import BlogItem from "./BlogItem";
import React from "react";

const BlogList = () => {
  return (
    <div className="w-[70%]">
        <ul className="flex h-[80px] items-center overflow-hidden w-full max-w-full px-5">
           {listItem.map(item => {
            return <li key={item.id} className={`px-3 py-2 whitespace-nowrap ${item.active? "border-b-slate-300 border-b": ""}`}>{item.text}</li>
           })}
        </ul>
      <div className="flex flex-col p-4 border-b border-r border-gray-200 gap-8 ">
        {/* item cột trái */}
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
      </div>
    </div>
  );
};

export default BlogList;