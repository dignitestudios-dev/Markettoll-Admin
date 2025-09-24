import React, { useEffect } from "react";
import RevenueChart from "../components/Revenue/RevenueChart";
import SubscriptionList from "../components/Revenue/SubscriptionList";
import Plans from "./Plans";

const Revenue = () => {
  
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      document.title = "Market-Toll - Revenue";
    };
    scrollToTop();
  }, []);

  return (
    <div>
      <Plans />
      <RevenueChart />
      <SubscriptionList />
    </div>
  );
};

export default Revenue;
