import React, { PureComponent } from "react";
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

const RevenueAndUsersBarChart = () => {
  return (
    <div className="w-full h-[50vh] pt-6 pb-4 px-0 border pr-6 rounded-xl relative">
      <div className="w-full flex gap-2 absolute top-2 right-2 text-end justify-end">
        <span className="text-xs bg-[#0098EA] text-white px-3 py-1 rounded-md">Users</span>
        <span className="bg-green-700 text-white px-3 py-1 rounded-md text-xs">Revenue</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={"100%"}
          height={"100%"}
          data={RevenueAndUsersData}
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
            dataKey="Users"
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
