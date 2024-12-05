import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserFeaturePosting() {
  const navigate = useNavigate("");
  return (
    <div>
      <div className="w-full overflow-x-auto h-[300px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
        <table className="w-full mt-4  border-collapse  text-left text-sm text-gray-500">
          <thead className="">
            <tr className="">
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-3 rounded-s-lg py-4 text-sm font-semibold"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                Sub Category
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                Status
              </th>           
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            <tr className="">
              <th className="px-6 lg:px-4 xl:px-3 flex gap-3  py-4 font-normal text-gray-900">
                <div className="text-sm">
                  <div className="font-medium text-gray-700 text-nowrap">
                    Product Name
                  </div>
                </div>
              </th>
              <td className="px-6 lg:px-4 xl:px-3 py-4 text-nowrap">
                Product Category
              </td>
              <td className="px-6 lg:px-4 xl:px-3 py-4 text-nowrap">
                Product Sub Category
              </td>

              <td className="px-6 lg:px-4 xl:px-3 py-4">$200</td>
              <td className="px-6 lg:px-4 xl:px-3 py-4"> status</td>            
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
