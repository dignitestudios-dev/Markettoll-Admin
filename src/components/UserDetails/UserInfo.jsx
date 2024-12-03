import React from "react";
import UserListing from "./UserListing";
import UserOrder from "./UserOrder";
import UserSubscription from "./UserSubscription";

const UserInfo = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="font-semibold text-xl">User Profile</h1>
      <div className="w-full lg:w-1/1 flex flex-col gap-4 border rounded-xl p-4 md:p-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-sm font-normal text-gray-500">Profile Photo:</p>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            className="w-20 h-20 bg-cover bg-center rounded-full"
          />
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-sm font-normal text-gray-500">Email:</p>
          <p className="text-sm font-medium">user@gmail.com</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-sm font-normal text-gray-500">Name:</p>
          <p className="text-sm font-medium">Jane Smith</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-sm font-normal text-gray-500">Phone Number:</p>
          <p className="text-sm font-medium">+1 3685986307</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-sm font-normal text-gray-500">
            Subscription Plan:
          </p>
          <p className="text-sm font-medium">Premium</p>
        </div>           
        <div className="pt-4">
          <button className="text-sm bg-red-600 text-white font-medium px-4 py-1.5 rounded-lg">
            Block User
          </button>
        </div>
      </div>
      <h1 className="font-semibold text-xl">User Listings</h1>
      <UserListing/>
      <h1 className="font-semibold text-xl">User Orders</h1>
      <UserOrder/>
      <h1 className="font-semibold text-xl">User Subscription</h1>
      <UserSubscription/>
    </div>
  );
};

export default UserInfo;
