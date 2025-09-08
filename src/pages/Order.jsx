import React, { useEffect, useState } from "react";
import OrderList from "../components/Order/OrderList";
import OrderFilter from "../components/Order/OrderFilter";

const Order = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.title = "Market-Toll - Order";
    };
    scrollToTop();
  }, []);
  const [filterData, setFilterData] = useState("");
  const [orderCount, setOrderCount] = useState(0);
  return (
    <div className="w-full flex flex-col gap-y-4">
      <h1 className="text-xl font-bold">
        Order <span className="text-[#0098EA] text-sm">({orderCount})</span>
      </h1>
      <OrderFilter setFilterData={setFilterData} />
      <OrderList setOrderCount={setOrderCount} filterData={filterData} />
    </div>
  );
};

export default Order;
