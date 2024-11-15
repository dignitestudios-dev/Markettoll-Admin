import React from "react";
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

const RevenueChart = () => {
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
          <LineChart width={"100%"} height={'100%'} data={revenuedata}>
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
