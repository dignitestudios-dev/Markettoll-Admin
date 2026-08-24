import React, { useState } from "react";
import { TbDotsVertical } from "react-icons/tb";
import { IoArrowBack } from "react-icons/io5";

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

const Avatar = ({ name, image, size = "w-10 h-10" }) => {
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

const ChatHeader = ({
  selectedUser,
  onBackMobile,
  onReportUser,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!selectedUser) return null;

  const name = selectedUser?.user_name || selectedUser?.name || selectedUser?.lastMessage?.profileName || "";
  const orderId = selectedUser?.order_id ? `#${selectedUser.order_id}` : "";
  const image =
    selectedUser?.image ||
    selectedUser?.profileImage ||
    selectedUser?.lastMessage?.profileImage ||
    "";

  return (
    <div className="w-full py-3 px-4 border-b border-gray-100 flex items-center justify-between bg-white rounded-t-2xl">
      <div className="flex items-center gap-3">
        {/* Mobile back button */}
        {onBackMobile && (
          <button
            onClick={onBackMobile}
            className="lg:hidden text-gray-600 hover:text-gray-900 p-1"
          >
            <IoArrowBack size={20} />
          </button>
        )}

        <Avatar name={name} image={image} size="w-10 h-10" />

        <div>
          <h3 className="font-semibold text-gray-900 text-sm md:text-base leading-tight">
            {name}
          </h3>
          {orderId && (
            <p className="text-xs text-[#0098EA] font-medium">{orderId}</p>
          )}
        </div>
      </div>

      {/* 3 Dots Menu */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <TbDotsVertical className="text-xl" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-20 text-sm">
            <button
              onClick={() => {
                setDropdownOpen(false);
                onReportUser?.();
              }}
              className="w-full text-left px-4 py-1.5 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
