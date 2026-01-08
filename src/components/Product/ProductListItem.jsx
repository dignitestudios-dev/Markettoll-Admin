import React from "react";
import { useNavigate } from "react-router-dom";

const ProductListItem = ({ item, onBoost }) => {
  const navigate = useNavigate("");
  const isBoosted =
    item?.boostPlan &&
    item?.boostPlan?.name &&
    item?.boostPlan?.name !== "No Plan";

  return (
    <tr
      className="cursor-pointer"
      onClick={() => {
        navigate(`/productDetail/${item._id}`, { state: { data: item } });
      }}
    >
      <th className="px-6 lg:px-4 xl:px-3 flex gap-3  py-4 font-normal text-gray-900">
        <div className="text-sm">
          <div className="font-medium text-gray-700 text-nowrap">
            {item.name}
          </div>
        </div>
      </th>
      <td className="px-6 lg:px-4 xl:px-3 py-4 text-nowrap">{item.category}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4 text-nowrap">
        {item.subCategory}
      </td>

      <td className="px-6 lg:px-4 xl:px-3 py-4">${item.price}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4"> {item?.adminStatus}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4 text-center">
        {isBoosted ? (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
            Boosted
          </span>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              onBoost(item);
            }}
            className="bg-blue-500  text-white px-3 py-2 rounded-md text-xs"
          >
            Boost Product
          </button>
        )}
      </td>
    </tr>
  );
};

export default ProductListItem;
