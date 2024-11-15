import React from "react";

const NewUserListItem = () => {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-start lg:flex-row lg:items-center gap-3 lg:gap-2 justify-between py-4 border-b">
        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="block w-9 h-9 rounded-full bg-cover bg-center"
          />
          <div className="flex flex-col">
            <h1 className="text-xs font-medium">Jane Smith</h1>
            <p className="text-xs font-normal text-gray-500">
              janesmith@gmail.com
            </p>
          </div>
        </div>
        <p className="text-xs font-medium">Premium</p>
        <p className="text-xs font-medium">London, UK</p>
        <button className="text-[10px] font-medium bg-red-600 text-white hover:opacity-85 px-3 py-1.5 rounded-md">
          Block
        </button>
      </div>
    </div>
  );
};

export default NewUserListItem;
