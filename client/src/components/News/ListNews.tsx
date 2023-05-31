import React from "react";
import NewsItem from "./NewsItem";

const ListNews = () => {
  return (
    <div>
      <h5 className="h-[80px] flex items-center text-lg font-semibold">Staff Picks</h5>
      <div className="flex flex-col gap-3">
        <NewsItem />
        <NewsItem />
        <NewsItem />
      </div>
    </div>
  );
};

export default ListNews;