import React, { useRef } from "react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { listItem } from "../NavList/fnhelper";


const CustomPrevButton = () => {
    // const { className, onClick } = props;
    return (
      <button 
    //   className={className} onClick={onClick}
    className="transform left-[-20px] "
      >
        Previous
      </button>
    );
  };

  interface Iprops {
    onClick:() => void
  }
  const CustomNextButton = ({onClick}: Iprops) => {
    return (
      <button 
    //   className={className}
       onClick={onClick}
    className="transform right-[-20px]"
      >
        Next
      </button>
    );
  };


export default function SimpleSlider() {
    const [showPrevButton, setShowPrevButton] = React.useState(true);
    const sliderRef = useRef<Slider | null>(null);
  const settings = {
    dots: false,
    // infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    // arrows: true,
    centerPadding: "60px",
    className: `py-2 whitespace-nowrap text-center text-[#aaa]`,
    variableWidth: true,
    nextArrow: <CustomNextButton onClick = { handleNext}/>,
    prevArrow: <CustomPrevButton /> 
}
 
function handleNext() {
    if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
}
  return (
    <div className="border border-red-300 relative px-10">
        <div className="">
        <Slider {...settings} ref={sliderRef}>
        {listItem.map((item) => {
          return (
            <div key={item.id} >
              <div>{item.text}</div>
            </div>
          );
        })}
       
      </Slider>
        </div>
     
    </div>
  );
}
// className={`px-3 py-2 whitespace-nowrap ${item.active? "border-b-slate-300 border-b": ""}`}
