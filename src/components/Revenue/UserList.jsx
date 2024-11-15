import React from "react";
import SubscriptionListItem from "./SubscriptionListItem";
import PackagesListItem from "./PackagesListItem";

const UserList = () => {
  return (
    <div className="w-full flex flex-col gap-6 mt-6">
      <div className="w-full overflow-x-auto h-[500px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="">
            <tr className="">
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 rounded-s-lg  py-4 text-sm font-semibold"
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
            <SubscriptionListItem />
            <SubscriptionListItem />
            <SubscriptionListItem />
            <SubscriptionListItem />
            <SubscriptionListItem />
            <SubscriptionListItem />
            <SubscriptionListItem />
            <SubscriptionListItem />
            <SubscriptionListItem />
            <SubscriptionListItem />
            <SubscriptionListItem />
          </tbody>
        </table>
      </div>
      <h1 className="text-xl font-bold">Boosting Packages Report</h1>      
      <div className="w-full overflow-x-auto h-[500px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="">
            <tr className="">
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 rounded-s-lg  py-4 text-sm font-semibold"
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
            <PackagesListItem />
            <PackagesListItem />
            <PackagesListItem />
            <PackagesListItem />
            <PackagesListItem />
            <PackagesListItem />
            <PackagesListItem />
            <PackagesListItem />
            <PackagesListItem />
            <PackagesListItem />
            <PackagesListItem />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
