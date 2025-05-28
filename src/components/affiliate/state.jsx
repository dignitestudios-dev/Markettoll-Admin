import React from "react";

export default function Stats() {
  const affiliateData = [
    {
      name: "Total Affiliate",
      value: 254,
    },
    {
      name: "Pending Request",
      value: 5,
    },
    {
      name: "Total Referred",
      value: 12,
    },
    {
      name: "Total Earnings",
      value: "$1520",
    },
    {
      name: "Wallet Balance",
      value: "$110520",
    },
  ];
  return (
    <div className="grid grid-cols-5 gap-2">
      {affiliateData?.map((item, i) => (
        <div
          key={i}
          className="bg-[#FFFFFF] border p-3 border-[#E5E7EB] rounded-[12px]"
        >
          <h3 className="font-[500] text-[14px] ">{item?.name}</h3>
          <p className="font-bold text-[22px] mt-3 bg-gradient-to-r from-[#0033A5] via-[#0995E7] to-[#0995E7] bg-clip-text text-transparent">
            {item?.value}
          </p>
        </div>
      ))}
    </div>
  );
}
