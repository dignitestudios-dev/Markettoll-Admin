import React, { PureComponent, useContext, useEffect, useState } from "react";
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
import { RevenueAndUsersData } from "../../constants/RevenueAndUsersData";
import BASE_URL from "../../constants/BaseUrl";
import { AuthContext } from "../../context/AuthContext";

const RevenueAndUsersBarChart = () => {

  const [data,setData]=useState([]);
  const { isUserData, setLoader } = useContext(AuthContext);

  useEffect(() => {
    const token = isUserData?.token;
    Promise.all([
      fetch(`${BASE_URL}admin/yearly-orders`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(res => res.json()),
      fetch(`${BASE_URL}admin/yearly-subscription-revenue`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then(res => res.json())
    ])
    .then(([orderData, revenueData]) => {
      const orderDataMap = orderData.data.reduce((acc, item) => {
        acc[item._id] = item.order_count;
        return acc;
      }, {});
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const updatedData = revenueData.data.map(item => {
        const month = item._id - 1;
        return {
          name: monthNames[month] || item._id,
          Revenue: item.revenue,
          Order: orderDataMap[item._id] || 0, 
        };
      });
      setData(updatedData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setLoader(false);
    });
  }, [isUserData]);
  
   return (
    <div className="w-full h-[50vh] pt-6 pb-4 px-0 border pr-6 rounded-xl relative">
      <div className="w-full flex gap-2 absolute top-2 right-2 text-end justify-end">
        <span className="text-xs bg-[#eab40b] text-white px-3 py-1 rounded-md">Orders</span>
        <span className="bg-green-700 text-white px-3 py-1 rounded-md text-xs">Revenue</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={"100%"}
          height={"100%"}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" className="text-xs text-gray-500" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Order"
            stroke="rgb(234 179 8)"
            activeDot={{ r: 8 }}
          />       
          <Line type="monotone" dataKey="Revenue" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueAndUsersBarChart;
