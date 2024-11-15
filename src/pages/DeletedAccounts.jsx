import React, { useEffect } from "react";
import DeletedFilter from "../components/DeletedAccounts/Filter";
import DeletedUserList from "../components/DeletedAccounts/UserList";

const DeletedAccounts = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0,0);
      document.title = "Market-Toll - Admin";
    };
    scrollToTop()
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-4">
      <DeletedFilter />
      <DeletedUserList />
    </div>
  );
};

export default DeletedAccounts;
