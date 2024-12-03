import React from 'react'

export default function UserOrder() {
  return (
<div className="w-full overflow-x-auto h-[300px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
      <table className="w-full border-collapse  text-left text-sm text-gray-500">
        <thead className="">
          <tr className="">
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-3 rounded-s-lg py-3 text-sm font-semibold"
            >
              Buyer Name
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2  py-3 text-sm font-semibold"
            >
              Buyer Email
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2  py-3 text-sm font-semibold"
            >
              Delivery Address{" "}
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2  py-3 text-sm font-semibold"
            >
              Total Price
            </th>
        
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        <tr className="">
      <th className="px-6 lg:px-4 xl:px-3 flex gap-3 py-4 font-normal text-gray-900">
        <div className="text-sm">
          <div className="font-medium text-gray-700">
           name
          </div>
        </div>
      </th>
      <td className="px-6 lg:px-4 xl:px-3 py-4">
        email
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">Address</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">Total</td>
     
    </tr>
        </tbody>
      </table>
    </div>
  )
}
