import React from "react";

const Home = () => {
  return (
    <>
      <div className="lg:ml-64">
        {/* Top  */}
        <div className="flex items-center justify-between">
          <div className="flex-1 ">
            <h1 className="text-[1.4rem] font-bold text-[#161825]">
              Our Stories
            </h1>
          </div>
          <div className="border-b inline-flex gap-11 items-center">
            <input
              className=" text-sm text-semibold border-none outline-none py-2.5"
              type="text"
              placeholder="Enter your keyword?"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="#696969"
              class="w-[1.1rem] "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>

        {/* Main */}
        <div className="flex mt-3">
          <div className="flex-1 ">Here will be the components</div>
          <div className=""> popular course and catergorise</div>
        </div>
      </div>
    </>
  );
};

export default Home;
