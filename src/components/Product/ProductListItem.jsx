import React from "react";

const ProductListItem = ({item}) => {
  return (
    <tr className="">
      <th className="px-6 lg:px-4 xl:px-3 flex gap-3  py-4 font-normal text-gray-900">
        <div className="text-sm">
          <div className="font-medium text-gray-700 text-nowrap">{item.name}</div>
        </div>
      </th>
      <td className="px-6 lg:px-4 xl:px-3 py-4 text-nowrap">{item.category}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4 text-nowrap">{item.subCategory}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4 text-nowrap">
        <p className="w-[250px] overflow-auto text-nowrap description-scroll " >
        {item.description}
        </p>
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">{item.price}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4"> {item.status}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4 text-nowrap">{item.seller?.name}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">{item.seller?.email?.value}</td>      
    </tr>
  );
};

export default ProductListItem;
