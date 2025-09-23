import React, { useEffect } from "react";

const Plans = () => {
  useEffect(() => {
    document.title = "Market-Toll - Plans";
  }, []);

  const plansData = [
    {
      name: "Free Plan",
      // price: 10,
      billingCycle: "month",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      // totalRevenueGenerated: 250,
      // thisMonth: 100,
      // totalSubscriptions: 50,
    },
    {
      name: "Basic Plan",
      price: 2.99,
      billingCycle: "month",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      totalRevenueGenerated: 250,
      thisMonth: 100,
      totalSubscriptions: 50,
    },
    {
      name: "Standard Plan",
      price: 5.99,
      billingCycle: "month",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      totalRevenueGenerated: 250,
      thisMonth: 100,
      totalSubscriptions: 50,
    },
    {
      name: "Premium Plan",
      price: 9.99,
      billingCycle: "month",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      totalRevenueGenerated: 250,
      thisMonth: 100,
      totalSubscriptions: 50,
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold">Subscription Plans</h1>
      <div className="grid grid-cols-1 mt-5 md:grid-cols-4 gap-6">
        {plansData?.map((item, i) => (
          <div key={i} className="w-full h-full ">
            <div
              className="h-[400px]
 bg-white
 rounded-md
 relative
 z-10
 overflow-hidden
 border border-primary border-opacity-20
 shadow-pricing
 py-10
 px-8
 sm:p-12
 lg:py-6 lg:px-6
 xl:p-6
 mb-10
 "
            >
              <span className="text-primary font-semibold text-lg block mb-4">
                {item?.name}
              </span>
                <h2 className="font-bold text-dark mb-5 text-[42px]">
                  ${item?.price||"0.00"}
                  <span className="text-base text-body-color font-medium">
                    / month
                  </span>
                </h2>
              <p
                className={`${!item?.price && "mt-4"}
    text-base text-body-color
    pb-8
    mb-8
    border-b border-[#F2F2F2]
    `}
              >
                {item?.description}
              </p>
                <div className="mb-0">
                  <div className="w-full flex justify-between items-center">
                    <p className="text-slate-600 font-normal text-sm">
                      Total Revenue Generated
                    </p>
                    <p className="text-sm text-slate-600">
                      ${item?.totalRevenueGenerated||"0.00"}
                    </p>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <p className="text-slate-600 font-normal text-sm">
                      This Month
                    </p>
                    <p className="text-sm text-slate-600">${item?.thisMonth||"0.00"}</p>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <p className="text-slate-600 font-normal text-sm">
                      Total Subscriptions
                    </p>
                    <p className="text-sm text-slate-600">
                      {item?.totalSubscriptions||"0.00"}
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
                    <circle cx={86} cy={86} r={86} fill="url(#paint0_linear)" />
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
                        <stop offset={1} stopColor="#C4C4C4" stopOpacity={0} />
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
        ))}
      </div>
    </div>
  );
};

export default Plans;
