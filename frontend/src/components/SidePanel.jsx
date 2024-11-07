import React from "react";

const SidePanel = () => {
  return (
    <div className="w-72 hidden lg:block">
      {/* search box  */}
      <div className=" py-2">
        <div className="border-b w-72 flex justify-between pr-4">
          <input
            className=" w-full text-sm text-semibold border-none outline-none py-2.5"
            type="text"
            placeholder="Type your search query here.."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="#696969"
            class="w-[1.2rem] cursor-pointer transition-transform hover:scale-110"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>

      {/* Popular Post  */}

      <div className="">
        <h1 className="font-medium text-md pb-4">POPULAR POSTS</h1>
        {/* <div className="flex justify-between items-end w-full border-red-400 border-2"> */}
        <div className="relative flex flex-col">
          <img
            className="w-full h-52 object-cover"
            src="https://images.pexels.com/photos/27072852/pexels-photo-27072852/free-photo-of-close-up-of-a-triangular-roof.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-[#00000006] to-[#000000c3] p-2">
            <h4 className="text-white text-sm">March 20, 2023</h4>
            <h3 className="pb-2 text-white text-wrap text-lg">
              Discover Your Inner Genius To Better
            </h3>
          </div>
        </div>
      </div>

      {/* Recent Post  */}
      <div className="">
        <h1 className="font-medium text-md pt-7">RECENT POSTS</h1>

        <div className="flex gap-2 items-start py-3">
          <img
            className="w-[4.1rem] h-12 object-cover"
            src="https://images.pexels.com/photos/16884194/pexels-photo-16884194/free-photo-of-blonde-with-dog-by-blue-door.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
          />
          <div className="leading-[12px]">
            <h5 className="text-sm leading-[17px] font-medium">
              Discover Your inner Genius To Bette better
            </h5>
            <span className="text-xs font-medium">MAR 23, 2021</span>
          </div>
        </div>
      </div>

      {/* all categoris list  */}
      <div className="">
        <h1 className="font-medium text-md pt-7">CATEGORIES</h1>

        <ul className="text-sm">
          <li className="flex gap-2 items-start border-b py-2 px-2 cursor-pointer mb-1 hover:bg-gray-100 bg-gray-50">
            All
          </li>
          <li className="flex gap-2 items-start border-b py-2 px-2 cursor-pointer mb-1 hover:bg-gray-100 bg-gray-50">
            Food
          </li>
          <li className="flex gap-2 items-start border-b py-2 px-2 cursor-pointer mb-1 hover:bg-gray-100 bg-gray-50">
            Lifestyle
          </li>
          <li className="flex gap-2 items-start border-b py-2 px-2 cursor-pointer mb-1 hover:bg-gray-100 bg-gray-50">
            Health
          </li>
          <li className="flex gap-2 items-start border-b py-2 px-2 cursor-pointer mb-1 hover:bg-gray-100 bg-gray-50">
            Fitness
          </li>
          <li className="flex gap-2 items-start border-b py-2 px-2 cursor-pointer mb-1 hover:bg-gray-100 bg-gray-50">
            Lifestyle
          </li>
          <li className="flex gap-2 items-start border-b py-2 px-2 cursor-pointer mb-1 hover:bg-gray-100 bg-gray-50">
            Fashion
          </li>
          <li className="flex gap-2 items-start border-b py-2 px-2 cursor-pointer mb-1 hover:bg-gray-100 bg-gray-50">
            Parenting
          </li>
          <li className="flex gap-2 items-start border-b py-2 px-2 cursor-pointer mb-1 hover:bg-gray-100 bg-gray-50">
            Travel
          </li>
          <li className="flex gap-2 items-start border-b py-2 px-2 cursor-pointer mb-1 hover:bg-gray-100 bg-gray-50">
            Technology
          </li>
          <li className="flex gap-2 items-start border-b py-2 px-2 cursor-pointer mb-1 hover:bg-gray-100 bg-gray-50">
            Finance
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidePanel;
