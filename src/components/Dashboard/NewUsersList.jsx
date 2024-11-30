import React from "react";
import NewUserListItem from "./NewUserListItem";
import { NavLink } from "react-router-dom";

const NewUsersList = () => {
  return (
    <div className="w-full flex flex-col border rounded-xl p-4">
      <div className="flex justify-between" >
      <h1 className="text-base font-semibold mb-2">New Users</h1>
      <NavLink to={'/users'} className="bg-[#0098EA] w-[100px] h-[40px] rounded-md text-white text-center py-2 " >View All</NavLink>
      </div>
      <NewUserListItem />
      <NewUserListItem />
      <NewUserListItem />
      <NewUserListItem />
      <NewUserListItem />
      <NewUserListItem />
    </div>
  );
};

export default NewUsersList;
