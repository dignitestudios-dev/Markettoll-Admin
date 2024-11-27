import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { revenuedata } from "../../constants/revenuedata";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";

const RevenueChart = () => {
 const [data,setData]=useState([]);
 const { isUserData, setLoader } = useContext(AuthContext);

 useEffect(() => {
  setLoader(true);
  const token = isUserData?.token;

  fetch(`${BASE_URL}admin/yearly-subscription-revenue`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const updatedData = res.data.map(item => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
        return {
          Revenue:item.revenue,
          name: monthNames[item._id - 1] || item._id
        };
      });
      console.log(updatedData,"updatedData");
      setData(updatedData);
      setLoader(false);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      setLoader(false);
    });
}, [isUserData]);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-ful flex flex-col items-start lg:flex-row lg:items-center justify-between gap-y-3">
        <h1 className="text-xl font-bold">Subscriptions</h1>
        <button className="text-sm font-medium bg-[#0098EA] rounded-lg text-white px-4 py-2.5 hover:opacity-90 transition-all duration-300">
          Download Report
        </button>
      </div>
      <div className="w-full h-[30vh] border rounded-xl lg:p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={"100%"} height={'100%'} data={data}>
            <XAxis dataKey="name" className="text-xs text-gray-500" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="Revenue"
              stroke="rgb(234 179 8)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
