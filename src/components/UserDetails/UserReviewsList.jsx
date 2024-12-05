import React, { useContext, useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import UserReviewCard from "./UserReviewCard";
const UserReviewsList = () => {

  return (
    <div className="border rounded-xl  px-3 py-3 h-[300px] overflow-auto description-scroll ">     
        <>
          <div className="flex items-center gap-1 my-2">a
            <IoIosStar className="text-yellow-400 text-xl" />
            <IoIosStar className="text-yellow-400 text-xl" />
            <IoIosStar className="text-yellow-400 text-xl" />
            <IoIosStar className="text-yellow-400 text-xl" />
            <IoIosStar className="text-gray-300 text-xl" />
            <span className="text-sm">(4)</span>
            <span className="text-sm text-gray-500">24</span>
          </div>
          <div className="flex flex-col items-start gap-2 mt-5">
            <div className="flex items-center justify-between gap-1 w-full">
              <div className="text-xs w-[15%] md:w-[10%]">5 stars</div>
              <div class="w-[70%] md:w-full bg-gray-200 rounded-full h-[8px] dark:bg-gray-700">
                <div class="bg-yellow-400 h-[8px] rounded-full w-[80%]"></div>
              </div>
              <div className="text-xs w-[10%] text-center">18</div>
            </div>
            <div className="flex items-center justify-between gap-1 w-full">
              <div className="text-xs w-[15%] md:w-[10%]">4 stars</div>
              <div class="w-[70%] md:w-full bg-gray-200 rounded-full h-[8px] dark:bg-gray-700">
                <div class="bg-yellow-400 h-[8px] rounded-full w-[80%]"></div>
              </div>
              <div className="text-xs w-[10%] text-center">8</div>
            </div>
            <div className="flex items-center justify-between gap-1 w-full">
              <div className="text-xs w-[15%] md:w-[10%]">3 stars</div>
              <div class="w-[70%] md:w-full bg-gray-200 rounded-full h-[8px] dark:bg-gray-700">
                <div class="bg-yellow-400 h-[8px] rounded-full w-[80%]"></div>
              </div>
              <div className="text-xs w-[10%] text-center">9</div>
            </div>
            <div className="flex items-center justify-between gap-1 w-full">
              <div className="text-xs w-[15%] md:w-[10%]">2 stars</div>
              <div class="w-[70%] md:w-full bg-gray-200 rounded-full h-[8px] dark:bg-gray-700">
                <div class="bg-yellow-400 h-[8px] rounded-full w-[80%]"></div>
              </div>
              <div className="text-xs w-[10%] text-center">6</div>
            </div>
            <div className="flex items-center justify-between gap-1 w-full">
              <div className="text-xs w-[15%] md:w-[10%]">1 stars</div>
              <div class="w-[70%] md:w-full bg-gray-200 rounded-full h-[8px] dark:bg-gray-700">
                <div class="bg-yellow-400 h-[8px] rounded-full w-[80%]"></div>
              </div>
              <div className="text-xs w-[10%] text-center">2</div>
            </div>
          </div>

          <div className="w-full mt-4" />
          <UserReviewCard />
          <UserReviewCard />
          <UserReviewCard />
          <UserReviewCard />
        </>
     
    </div>
  );
};

export default UserReviewsList;
