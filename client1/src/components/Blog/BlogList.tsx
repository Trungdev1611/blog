import SimpleSlider from "../Slick/Slick";
import BlogItem from "./BlogItem";

const BlogList = () => {
  return (
    <div>
         <SimpleSlider />

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
