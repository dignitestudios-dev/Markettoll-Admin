import React, { useEffect } from "react";
import CustomerList from "../components/CustomerSupport/CustomerList";
import Filter from "../components/Users/Filter";

const Customer = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0,0);
      document.title = "BCT - Users";
    };
    scrollToTop()
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-4">
         <h1 className="text-xl font-bold">Customer Report</h1>
      <Filter />
      <CustomerList />
    </div>
  );
};

export default Customer;
