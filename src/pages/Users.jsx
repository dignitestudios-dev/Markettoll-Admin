import React, { useEffect } from "react";
import Filter from "../components/Users/Filter";
import UserList from "../components/Users/UserList";

const Users = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0,0);
      document.title = "BCT - Users";
    };
    scrollToTop()
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-4">
         <h1 className="text-xl font-bold">Users</h1>
      <Filter />
      <UserList />
    </div>
  );
};

export default Users;
