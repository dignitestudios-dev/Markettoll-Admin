import React, { useState } from "react";
import { BiChevronDown, BiChevronDownCircle, BiCopy } from "react-icons/bi";
import { useLocation } from "react-router-dom";

export default function AffiliateDetail() {
 
  const [accountStatus, setAccountStatus] = useState("Active");
  const [payoutStatus, setPayoutStatus] = useState("Pending");
  
  const [copied, setCopied] = useState(false);
  const {state} = useLocation();
  const affiliateLink =
    "https://www.markettoll.com/wyferg45wpg|gwl5gwr.g/res?htrf";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

 const [commissionRate, setCommissionRate] = useState(state?.influencerRate);
 const [linkActive, setLinkActive] = useState(state?.status=="active"?true:false);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">Details</h1>
        <img src={"/active.png"} alt="active.png" className="w-24" />
      </div>
      <div className=" mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {/* Profile Section */}
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-6 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">
                Profile Photo:
              </span>
              <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden">
                <img
                  src={state.profileImage?state?.profileImage:"/circle.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">Name:</span>
              <span className="text-gray-900 font-medium">{state?.name}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">Email:</span>
              <span className="text-gray-900 font-medium">
                {state?.email?.value}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">
                Phone Number
              </span>
              <span className="text-gray-900 font-medium">+{state?.phoneNumber.code+state?.phoneNumber.value}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">
                Total Referred Users:
              </span>
              <span className="text-gray-900 font-semibold">{state?.referredUsersCount}</span>
            </div>

          

            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">
                Total Earnings:
              </span>
              <span className="text-gray-900 font-semibold">${state?.totalEarning}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">
                Amount Paid:
              </span>
              <span className="text-gray-900 font-semibold">${state?.totalPaid}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">
                Wallet Balance:
              </span>
              <span className="text-gray-900 font-semibold">${state?.walletBalance}</span>
            </div>

            {/* Dropdown Sections */}
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">
                Assigned Commission Rate
              </span>
              <div className="relative">
                <select
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="%5">%5</option>
                  <option value="%10">%10</option>
                  <option value="%15">%15</option>
                </select>
                <BiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">
                Account Status
              </span>
              <div className="relative">
                <select
                  value={accountStatus}
                  onChange={(e) => setAccountStatus(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
                <BiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">
                Payout Status Overview
              </span>
              <div className="relative">
                <select
                  value={payoutStatus}
                  onChange={(e) => setPayoutStatus(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Processing">Processing</option>
                </select>
                <BiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
        {/* Affiliate Link Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-4 flex-1">
              <span className="text-gray-700 font-medium">Affiliate Link</span>
              <div className="flex items-center space-x-2 flex-1">
                <span className="text-gray-600 text-sm truncate max-w-md">
                  {affiliateLink}
                </span>
                <button
                  onClick={handleCopyLink}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Copy link"
                >
                  <BiCopy className="w-4 h-4 text-gray-500" />
                </button>
                {copied && (
                  <span className="text-green-600 text-xs font-medium">
                    Copied!
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-gray-700 font-medium">Active</span>
              <button
                onClick={() => setLinkActive(!linkActive)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                  linkActive ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    linkActive ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
