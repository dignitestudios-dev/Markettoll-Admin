import React, { useState } from "react";

// Generate a consistent background color from name string
const getAvatarColor = (name = "") => {
  const colors = [
    "#0098EA", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4",
    "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const Avatar = ({ name, image, size = "w-11 h-11" }) => {
  const [imgError, setImgError] = useState(false);
  const hasImage = image && image !== "/chat-img.png";
  const initial = (name || "U").charAt(0).toUpperCase();
  const bgColor = getAvatarColor(name);

  if (hasImage && !imgError) {
    return (
      <img
        src={image}
        alt={name}
        className={`${size} rounded-full object-cover border border-gray-100`}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className={`${size} rounded-full flex items-center justify-center border border-gray-100 text-white font-bold text-base shrink-0`}
      style={{ backgroundColor: bgColor }}
    >
      {initial}
    </div>
  );
};

const ChatUserCard = ({ item, isSelected, onSelect, currentUserId }) => {
  const name = item?.user_name || item?.name || "User";
  const image =
    item?.image ||
    item?.profileImage ||
    item?.lastMessage?.profileImage ||
    "";
  const lastMsg = item?.last_msg?.message || item?.last_msg?.content || item?.lastMessageText || "";

  // Check if unread (currentUserId/admin_id is NOT in seen_by array)
  const seenBy = item?.last_msg?.seen_by;
  const isUnread = Boolean(
    currentUserId &&
    Array.isArray(seenBy) &&
    !seenBy.includes(currentUserId) &&
    !seenBy.includes("admin_id")
  );

  let date = "Today";
  const createdAt = item?.last_msg?.created_at || item?.created_at || item?.createdAt;
  if (createdAt) {
    try {
      let dateObj = null;
      if (typeof createdAt.toDate === "function") {
        dateObj = createdAt.toDate();
      } else if (createdAt.seconds) {
        dateObj = new Date(createdAt.seconds * 1000);
      } else {
        dateObj = new Date(createdAt);
      }

      if (dateObj && !isNaN(dateObj.getTime())) {
        date = dateObj
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .replace(",", "");
      }
    } catch (e) {
      date = "Today";
    }
  }

  return (
    <div
      onClick={onSelect}
      className={`relative w-full flex items-center justify-between p-3 cursor-pointer transition-colors duration-150 rounded-xl ${isSelected
          ? "bg-[#F3F8FF] text-[#0A2540]"
          : "hover:bg-gray-50 text-gray-700"
        }`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="relative shrink-0">
          <Avatar name={name} image={image} size="w-11 h-11" />
          {isUnread && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#0098EA] border-2 border-white rounded-full" />
          )}
        </div>

        <div className="min-w-0 flex-1 pr-2">
          <h4
            className={`text-sm truncate ${isUnread ? "font-bold text-black" : "font-semibold text-gray-900"
              }`}
          >
            {name} {item?.order_id ? `#${item.order_id}` : ""}
          </h4>
          <p
            className={`text-xs truncate mt-0.5 ${isUnread ? "font-bold text-gray-900" : "font-normal text-gray-400"
              }`}
          >
            {lastMsg}
          </p>
        </div>
      </div>

      <div className="shrink-0 text-right self-start pt-1">
        <span
          className={`text-[11px] whitespace-nowrap ${isUnread ? "font-bold text-[#0098EA]" : "font-medium text-gray-400"
            }`}
        >
          {date}
        </span>
      </div>

      {isSelected && (
        <div className="absolute right-0 top-1 bottom-1 w-1 bg-[#0098EA] rounded-l-md" />
      )}
    </div>
  );
};

export default ChatUserCard;
