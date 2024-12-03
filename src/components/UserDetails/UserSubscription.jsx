import React from 'react'

export default function UserSubscription() {
  return (
    <div className="w-full overflow-x-auto h-[300px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="">
            <tr className="">
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-3 rounded-s-lg  py-4 text-sm font-semibold"
              >
                User
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 text-sm font-semibold"
              >
                Package
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 text-sm font-semibold"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 text-sm font-semibold"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 rounded-r-lg text-sm font-semibold"
              >
                Purchase Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y  divide-gray-100 border-t border-gray-100">
          <tr className="">
      <td className="px-6 lg:px-4 xl:px-3 flex gap-3  py-4 font-normal text-gray-900">      
        <div className="text-sm">
          <div className="font-medium text-gray-700">Name</div>
          <div mailto:classname="text-gray-400">email</div>
        </div>
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">Free</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">$400</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
        Status
        </span>
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">PurchaseDate</td>

    </tr>
          </tbody>
        </table>
      </div>
  )
}
