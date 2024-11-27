import React from "react";

const SubscriptionListItem = ({item}) => {
  return (
    <tr className="">
      <td className="px-6 lg:px-4 xl:px-3 flex gap-3  py-4 font-normal text-gray-900">      
        <div className="text-sm">
          <div className="font-medium text-gray-700">{item?.name}</div>
          <div mailto:classname="text-gray-400">{item?.email.value}</div>
        </div>
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">{item?.subscriptionPlan.name}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">{item?.subscriptionPlan.price}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
          {item?.subscriptionPlan.status}
        </span>
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">{item?.subscriptionPlan.purchasedAt}</td>

    </tr>
  );
};

export default SubscriptionListItem;
