import React from "react";

const ProductListItem = () => {
  return (
    <tr className="">
      <th className="px-6 lg:px-4 xl:px-0 flex gap-3  py-4 font-normal text-gray-900">
        <div className="text-sm">
          <div className="font-medium text-gray-700">Steven Jobs</div>
        </div>
      </th>
      <td className="px-6 lg:px-4 xl:px-0 py-4">Sports & Outdoors</td>
      <td className="px-6 lg:px-4 xl:px-0 py-4">Outdoor Gear</td>
      <td className="px-6 lg:px-4 xl:px-0 py-4">
        <p className="w-[250px] overflow-auto text-nowrap description-scroll " >
          lock jdjd siddjdhs dukes dish’s sjdjshs Chris d use nfjdncbsnicbduc s
          djddjiejddue shdueusus d djcidejshs. dnduduahsi dnsuwishwd dbxhdhsbd
          snxjdhsbd d xjisishsugsjcjej
        </p>
      </td>
      <td className="px-6 lg:px-4 xl:px-0 py-4">$2000</td>
      <td className="px-6 lg:px-4 xl:px-0 py-4"> Active</td>
      <td className="px-6 lg:px-4 xl:px-0 py-4">Steve</td>
      <td className="px-6 lg:px-4 xl:px-0 py-4">steven@yopmail.com</td>      
    </tr>
  );
};

export default ProductListItem;
