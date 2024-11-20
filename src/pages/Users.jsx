import React, { useEffect, useState } from "react";
import Filter from "../components/Users/Filter";
import UserList from "../components/Users/UserList";

const Users = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0,0);
      document.title = "Market-Toll - Users";
    };
    scrollToTop()
  }, []);
  const [filterData,setFilterData]=useState([])

  return (
    <div className="w-full flex flex-col gap-y-4">
         <h1 className="text-xl font-bold">Users</h1>
      <Filter  setFilterData={setFilterData} />
      <UserList filterData={filterData} />
    </div>
  );
};

export default Users;
