import Image from "next/image";
import React from "react";

const Featured = () => {
  return (
    <div className=" bg-[#222] grid grid-cols-2 gap-10 py-4 px-6">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-white">Pro Anywhere</h1>
        <p className="text-[#aaa]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className="flex gap-2 mt-6">
          <button className="btn-white">Read More</button>
          <button className="btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
      <div className=" w-[100%] flex justify-center">
        <Image
          src="https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2022/03/MacBook-Pro-scaled.jpg?fit=2560%2C1919&quality=50&strip=all&ssl=1"
          alt="mac book pro"
          height={500}
          width={500}
        />
      </div>
    </div>
  );
};

export default Featured;
