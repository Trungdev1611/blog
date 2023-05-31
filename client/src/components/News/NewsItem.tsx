import React from "react";
const NewsItem = () => {
    return (
      <div>
        <div className="flex gap-2 items-center">
          <img
            src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg"
            className="w-[30px] h-[30px] rounded-[50%]"
            alt=""
          />
          <div className="name text-sm font-[400]">Adrienne Gibbs in The Medium Blog</div>
        </div>
        <div className="text-[14px] text-[#333] mt-2 font-[700] leading-5">
        What We’re Reading: Always Take a Peek at the Comments
        </div>
      </div>
    );
  };
  
  export default NewsItem;