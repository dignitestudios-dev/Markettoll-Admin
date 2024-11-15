import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const CreateNotification = ({ showModal, onclick }) => {
  const [data, setData] = useState({
    notification_title: "",
    notification_message: "",
  });

  const handleChange = (e) => {
    setData((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Notification data >> ", data);
  };

  return (
    showModal && (
      <div className="w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 right-0 bottom-0 z-30 px-4">
        <form onSubmit={handleSubmit} className="w-[500px] h-auto bg-white p-6 rounded-lg flex flex-col gap-5 relative">
          <button
            className="w-6 h-6 rounded-full bg-gray-200 p-1 absolute top-6 right-6"
            onClick={onclick}
          >
            <IoClose className="w-full h-full" />
          </button>
          <h1 className="text-xl font-semibold">Send Notification</h1>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="notification_title" className="text-sm font-medium">
              Notification Title
            </label>
            <input
              type="text"
              name="notification_title"
              id="notification_title"
              value={data.notification_title}
              onChange={handleChange}
              className="w-full border rounded-lg text-sm py-2.5 px-3.5 focus:border-yellow-500 focus:ring focus:ring-yellow-200 outline-none"
              placeholder="Title"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="notification_message" className="text-sm font-medium">
              Notification Message
            </label>
            <textarea
              name="notification_message"
              id="notification_message"
              rows={"6"}
              value={data.notification_message}
              onChange={handleChange}
              className="w-full border rounded-lg text-sm py-2.5 px-3.5 focus:border-yellow-500 focus:ring focus:ring-yellow-200 outline-none"
              placeholder="Message..."
            ></textarea>
          </div>
          <div className="w-full mt-2">
            <button type="submit" className="w-full bg-[#0098EA] text-white font-medium text-sm rounded-lg py-3">
              Send Now
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default CreateNotification;
