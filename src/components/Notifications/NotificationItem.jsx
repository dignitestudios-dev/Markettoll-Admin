import React from "react";
import { IoNotificationsCircleSharp } from "react-icons/io5";

const NotificationItem = () => {
  return (
    <div className="w-full flex rounded-lg border border-gray-200 p-4 text-left text-gray-600 sm:p-4 gap-1 justify-start">
      <IoNotificationsCircleSharp className="block h-16 w-16" />
      <div class="w-full text-left">
        <div class="mb-2 flex flex-col justify-between text-gray-600 sm:flex-row pt-2">
          <h3 class="font-semibold text-base">Title of Notification</h3>
          <time class="text-xs" datetime="2022-11-13T20:00Z">
            July 18, 2022 at 10:36 AM
          </time>
        </div>
        <p class="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit!
        </p>
      </div>
    </div>
  );
};

export default NotificationItem;
