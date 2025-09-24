import React, { useContext, useEffect, useState } from "react";
import BASE_URL from "../constants/BaseUrl";
import { AuthContext } from "../context/AuthContext";

const plansData = [
  {
    name: "Free Plan",
    price: "0.00",
    billingCycle: "month",
    features: [
      "Post 1 listing per month",
      "No free Boosts available",
      "Includes more ads",
      "Wishlist feature is locked",
    ],
    totalRevenue: 0,
    thisMonthRevenue: 0,
    totalUsers: 0,
  },
  {
    name: "Basic Plan",
    price: 2.99,
    billingCycle: "month",
    features: [
      "Post up to 2 listings per month",
      "1 complimentary boosts, valid for 7 days only",
      "Fewer ads than the Free Plan",
      "Wishlist feature is locked",
    ],
    totalRevenue: 0,
    thisMonthRevenue: 0,
    totalUsers: 0,
  },
  {
    name: "Standard Plan",
    price: 5.99,
    billingCycle: "month",
    features: [
      "Post up to 5 listings per month",
      "3 complimentary boosts, valid for 7 days only",
      "Limited advertisements",
      "Wishlist feature is locked",
    ],
    totalRevenue: 0,
    thisMonthRevenue: 0,
    totalUsers: 0,
  },
  {
    name: "Premium Plan",
    price: 9.99,
    billingCycle: "month",
    features: [
      "Unlimited listings",
      "6 complimentary boosts, valid for 7 days only",
      "Completely ad-free experience",
      "Wishlist feature unlocked",
    ],
    totalRevenue: 0,
    thisMonthRevenue: 0,
    totalUsers: 0,
  },
];

const Plans = () => {
  const { isUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [plansStats, setPlansStats] = useState(plansData);

  const fetchSubscriptionsStats = () => {
    setLoading(true);
    const token = isUserData?.token;

    fetch(`${BASE_URL}/admin/subscription-plan-counts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("plans: ", res.plans);

        // merge API stats with static plan definitions
        const merged = plansData.map((plan) => {
          const stats = res.plans[plan.name] || {};
          return {
            ...plan,
            ...stats, // thisMonthRevenue, totalRevenue, totalUsers, etc.
          };
        });

        setPlansStats(merged);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSubscriptionsStats();
  }, [isUserData]);

  console.log("plansStats: ", plansStats);

  return (
    <div>
      <h1 className="text-xl font-bold">Subscription Plans Stats</h1>
      <div className="grid grid-cols-1 mt-5 md:grid-cols-4 gap-6 mb-10">
        {loading ? (
          <>
            <div className="w-full h-full min-h-96 rounded-md bg-gray-200 animate-pulse"></div>
            <div className="w-full h-full min-h-96 rounded-md bg-gray-200 animate-pulse"></div>
            <div className="w-full h-full min-h-96 rounded-md bg-gray-200 animate-pulse"></div>
            <div className="w-full h-full min-h-96 rounded-md bg-gray-200 animate-pulse"></div>
          </>
        ) : (
          plansStats?.map((item, i) => (
            <div key={i} className="w-full h-full ">
              <div className="h-full bg-white rounded-md relative z-10 overflow-hidden border border-primary border-opacity-20 shadow-pricing py-10 px-8 sm:p-12 lg:py-6 lg:px-6 xl:p-6 flex flex-col">
                <span className="text-primary font-semibold text-lg block mb-4">
                  {item?.name}
                </span>
                <h2 className="font-bold text-dark mb-5 text-[42px]">
                  ${item?.price || "0.00"}
                  <span className="text-base text-body-color font-medium">
                    / month
                  </span>
                </h2>
                <p
                  className={`${
                    !item?.price && "mt-4"
                  } text-base text-body-color pb-8 mb-8 border-b border-[#F2F2F2]`}
                >
                  <ul className="ps-5 space-y-2">
                    {item.features.map((feat, index) => (
                      <li key={index} className="text-gray-500 text-xs list-disc">{feat}</li>
                    ))}
                  </ul>
                </p>
                <div className="flex-1 mb-0">
                  <div className="w-full flex justify-between items-center">
                    <p className="text-slate-600 font-normal text-sm">
                      Total Revenue Generated
                    </p>
                    <p className="text-sm text-slate-600">
                      ${item?.totalRevenue || "0.00"}
                    </p>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <p className="text-slate-600 font-normal text-sm">
                      This Month
                    </p>
                    <p className="text-sm text-slate-600">
                      ${item?.thisMonthRevenue || "0.00"}
                    </p>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <p className="text-slate-600 font-normal text-sm">
                      Total Subscriptions
                    </p>
                    <p className="text-sm text-slate-600">
                      {item?.totalUsers || "0.00"}
                    </p>
                  </div>
                </div>
                <button className="w-full h-10 mt-4 rounded-md hover:opacity-90 bg-[#028EE6] text-white text-sm font-medium">
                  View Details
                </button>
                <div>
                  <span className="absolute right-0 top-7 z-[-1]">
                    <svg
                      width={77}
                      height={172}
                      viewBox="0 0 77 172"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx={86}
                        cy={86}
                        r={86}
                        fill="url(#paint0_linear)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear"
                          x1={86}
                          y1={0}
                          x2={86}
                          y2={172}
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#028EE6" stopOpacity="0.09" />
                          <stop
                            offset={1}
                            stopColor="#C4C4C4"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                  <span className="absolute right-4 top-1 z-[-1]">
                    <img src="/dotsBg.png" alt="dotsBg.png" className="w-14" />
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Plans;
