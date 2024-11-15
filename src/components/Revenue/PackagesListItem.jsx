import React from "react";

const PackagesListItem = () => {
  return (
    <tr className="">
      <td className="px-6 lg:px-4 xl:px-3 flex gap-3  py-4 font-normal text-gray-900">
        <div className="relative h-10 w-10">
          <img
            className="h-full w-full rounded-full object-cover object-center"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />        
        </div>
        <div className="text-sm">
          <div className="font-medium text-gray-700">Steven Jobs</div>
          <div mailto:classname="text-gray-400">jobs@sailboatui.com</div>
        </div>
      </td>
    
      <td className="px-6 lg:px-4 xl:px-3 py-4">Silver</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">USD $100</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
          Active
        </span>
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">22/15/15</td>

    </tr>
  );
};

export default PackagesListItem;
