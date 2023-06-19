import { FiMoreHorizontal } from "react-icons/fi";

const BlogItem = () => {
  return (
    <div className="flex gap-6 border-slate-200 pb-2 border-b items-center flex-col sm:flex-row">
      <div className=" flex flex-col gap-3 flex-1">
        <div className="flex gap-3 author  items-center">
          <img
            src="https://www.shutterstock.com/image-photo/headshot-portrait-happy-ginger-girl-260nw-623804987.jpg"
            alt=""
            className="h-[30px] w-[30px] rounded-[50%]"
          />
          <div>FardaKarimov in Level Up Coding ·May 11</div>
        </div>
        <h2 className="text-lg font-semibold">
          The filter method creates a shallow copy of a p
        </h2>
        <div className="text-slate-500 line-clamp-3 ">
          If you’ve never heard of PostCSS or are wondering how it’s different
          from tools like Sass, read our guide on using PostCSS as your
          preprocessor for an introduction. If you’ve never heard of PostCSS or
          are wondering how it’s different from tools like Sass, read our guide
          on using PostCSS as your preprocessor for an introduction.
        </div>

        <div className="info-blog flex justify-between my-4 items-center flex-wrap">
          <div className="flex gap-3 items-center">
          <div className="px-2 py-1 rounded-[8px] bg-neutral-200 text-slate-600">
            FrontEnd Development
          </div>
          <div className="text-slate-500 cursor-pointer">5 min read</div>
          </div>
     
   
          <span className="text-slate-500 cursor-pointer text-xl">
            <FiMoreHorizontal />
          </span>
        </div>
      </div>

      <div className=" h-full w-full sm:h-[120px] sm:w-[130px] border-red-700  relative top-[-12px]">
        <img
          src="https://th.bing.com/th/id/R.a32de9a092e9669013facf542d0f224a?rik=04%2fx89m%2bs3Bmkg&riu=http%3a%2f%2fwww.photo-mate.com%2fsites%2fdefault%2ffiles%2fimages%2fediting%2fdynamic2%2forg.jpg&ehk=LBmwdFOnJmNtr5%2fNARdYr0CHZIuJ9C2ost8Up37ytKQ%3d&risl=&pid=ImgRaw&r=0"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default BlogItem;