import React from "react";
import NewUserListItem from "./NewUserListItem";

const NewUsersList = () => {
  return (
    <div className="w-full flex flex-col border rounded-xl p-4">
      <h1 className="text-base font-semibold mb-2">New Users</h1>
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
