import React, { useEffect } from "react";
import ReportList from "../components/Reports/ReportList";

const Reports = () => {
  
  useEffect(() => {
    document.title = "BCT - Reports";
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">Reports</h1>
      <ReportList />
    </div>
  );
};

export default Reports;
