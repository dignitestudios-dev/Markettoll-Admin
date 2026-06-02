import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInterceptor from "../../axiosInterceptor";
const RevenueChart = () => {
  const [data, setData] = useState([]);
  const { isUserData, setLoader } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const [monthPick, setMonthPick] = useState(new Date());
  const [originalData, setOriginalData] = useState([]);
  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        setLoader(true);

        const res = await axiosInterceptor.get(
          "/admin/yearly-subscription-revenue",
          {
            params: {
              year: startDate.getFullYear(),
            },
          }
        );

        const monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];

        const updatedData = (res.data.data || []).map((item) => ({
          Revenue: item.revenue,
          name: monthNames[item._id - 1] || item._id,
        }));

        console.log(updatedData, "updatedData");

        setOriginalData(updatedData);
        setData(updatedData);

      } catch (error) {
        console.error("Error fetching revenue:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchRevenue();
  }, [startDate]);

  const customHeader = ({ date, changeYear, changeMonth }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span>
        {date.getFullYear()} -{" "}
        {date.toLocaleString("default", { month: "long" })}
      </span>
    </div>
  );
  const MonthFilterGraph = (date) => {
    const shortMonthName = date.toLocaleString("default", { month: "short" });
    const filteredData = data.filter((item) => item.name === shortMonthName);
    if (filteredData.length === 0) {
      setData(originalData);
    } else {
      setData(filteredData);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-ful flex flex-col items-start lg:flex-row lg:items-center justify-between gap-y-3">
        <h1 className="text-xl font-bold flex items-center gap-2">Subscriptions <span className="text-[#0098EA] text-sm mt-1"> (4)</span></h1>
        <div className="w-full flex gap-2  text-end justify-end">
          <div>
            <DatePicker
              className="w-[80px] px-1 focus:border-[#0098EA] focus:outline-[#0098EA] border rounded-lg"
              selected={monthPick}
              onChange={(date) => {
                // Set the selected month and filter data
                setMonthPick(date);
                MonthFilterGraph(date);
              }}
              dateFormat="MM"
              showMonthYearPicker
              showFullMonthYearPicker
              showTwoColumnMonthYearPicker
              renderCustomHeader={customHeader}
            />
          </div>
          <div>
            <DatePicker
              className="w-[80px] px-1  focus:border-[#0098EA]  focus:outline-[#0098EA]  border rounded-lg"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              maxDate={new Date()}
              showYearPicker
              dateFormat="yyyy"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[30vh] border rounded-xl lg:p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={"100%"} height={"100%"} data={data}>
            <XAxis dataKey="name" className="text-xs text-gray-500" />
            <YAxis className="text-xs text-gray-500" />
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
