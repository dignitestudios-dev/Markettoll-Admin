import React from "react";
import { useNavigate } from "react-router-dom";

const ProductListItem = ({item}) => {
  console.log(item,"produccst");
  
  const navigate=useNavigate("");
  return (
    <tr className="">
      <th className="px-6 lg:px-4 xl:px-3 flex gap-3  py-4 font-normal text-gray-900">
        <div className="text-sm">
          <div className="font-medium text-gray-700 text-nowrap">{item.name}</div>
        </div>
      </th>
      <td className="px-6 lg:px-4 xl:px-3 py-4 text-nowrap">{item.category}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4 text-nowrap">{item.subCategory}</td>

      <td className="px-6 lg:px-4 xl:px-3 py-4">${item.price}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4"> {item.status}</td>
 
      <td className="px-6 lg:px-4 xl:px-3 py-4"> 
        <button
          onClick={()=>{
            navigate(`/productDetail/${item._id}`)          
          }}
          className={`w-auto px-3 py-1 text-nowrap bg-[#0098EA] text-white  hover:opacity-80  rounded-md text-xs`}
        >
          Product Detail         
        </button></td>   
    </tr>
  );
};

export default ProductListItem;
