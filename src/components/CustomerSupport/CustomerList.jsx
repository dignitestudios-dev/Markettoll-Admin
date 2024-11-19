import React, { useState } from "react";
import CustomerListItem from "./CustomerListItem";
import CustomerReply from "./CustomerReply";

const CustomerList = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="w-full overflow-x-auto h-[600px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
      <table className="w-full border-collapse  text-left text-sm text-gray-500">
        <thead className="">
        <tr className="">
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-3 rounded-s-lg py-4 text-sm font-semibold"
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
              className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
            >
              Phone
            </th>

            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2  rounded-r-lg py-4 text-sm font-semibold text-center"
            >Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          <CustomerListItem handleShowModal={handleShowModal}/>
          <CustomerListItem handleShowModal={handleShowModal} />
          <CustomerListItem handleShowModal={handleShowModal}/>
          <CustomerListItem handleShowModal={handleShowModal}/>
          <CustomerListItem handleShowModal={handleShowModal}/>
          <CustomerListItem handleShowModal={handleShowModal}/>
          <CustomerListItem handleShowModal={handleShowModal}/>
          <CustomerListItem handleShowModal={handleShowModal}/>
          <CustomerListItem handleShowModal={handleShowModal}/>      
        </tbody>
      </table>
      <CustomerReply showModal={showModal} onclick={handleShowModal} />
    </div>
  );
};

export default CustomerList;
