import React from "react";
import DeletedUserListItem from "./UserListItem";

const DeletedUserList = () => {
  return (
    <div className="w-full overflow-x-auto h-[600px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
      <table className="w-full border-collapse  text-left text-sm text-gray-500">
        <thead className="">
          <tr className="">
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2 rounded-s-lg py-4 text-sm font-semibold"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2 rounded-r-lg py-4 text-sm font-semibold"
            >
              Phone
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          <DeletedUserListItem/>
          <DeletedUserListItem/>
          <DeletedUserListItem/>
          <DeletedUserListItem/>
          <DeletedUserListItem/>
          <DeletedUserListItem/>
          <DeletedUserListItem/>
          <DeletedUserListItem/>
          <DeletedUserListItem/>         
        </tbody>
      </table>
    </div>
  );
};

export default DeletedUserList;
