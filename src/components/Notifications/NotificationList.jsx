import React, { useState } from "react";
import NotificationItem from "./NotificationItem";
import CreateNotification from "./CreateNotification";

const NotificationList = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex flex-col items-start md:flex-row gap-3 md:items-center justify-between">
        <h1 className="text-xl font-bold">Send Push Notification</h1>
        <button className="text-sm font-medium text-white bg-[#0098EA] hover:opacity-90 px-4 py-2.5 rounded-lg" onClick={handleShowModal}>
          Create Notification
        </button>
        <CreateNotification showModal={showModal} onclick={handleShowModal} />
      </div>
      <div className="w-full rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </div>
    </div>
  );
};

export default NotificationList;
