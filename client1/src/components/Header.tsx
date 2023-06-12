import { BsPencilSquare, BsBell } from "react-icons/bs";

const Header = () => {
  return (
    <div>
      <header>
        <div className="flex justify-between px-8 py-2 shadow-sm border-b border-slate-200">
          <div className="flex gap-6 place-items-center">
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/5968/5968885.png"
                alt="logo"
                width={50}
                height={"auto"}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search medium"
                className="rounded-md outline-none border-gray-300 border p-1 min-w-[250px]"
              />
            </div>
          </div>
          <div className="flex gap-6 place-items-center">
            <span className="text-[20px] text-gray-600">
              <BsPencilSquare />
            </span>
            <span className="text-[20px] text-gray-600">
              <BsBell />
            </span>
            <img
              src="https://img.freepik.com/free-photo/close-up-happy-brunette-girl-white-t-shirt-laughing-smiling-carefree-camera_1258-19129.jpg"
              alt=""
              className="object-cover rounded-[50%] w-[40px] h-[40px]"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
