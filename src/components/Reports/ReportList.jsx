import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReportDetailsModal from "./ReportDetailsModal";

const ReportList = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="w-full mt-4">
      <div className="w-full">
        <table className="w-full text-start overflow-x-scroll border">
          <tr className="border-b border-t bg-gray-100">
            <th className="text-sm font-semibold text-start py-4 md:pl-2">
              Reporter's username
            </th>
            <th className="text-sm font-semibold text-start py-4">
              Reported user
            </th>
            <th className="text-sm font-semibold text-start py-4">Category</th>
            <th className="text-sm font-semibold text-start py-4">Date</th>
            <th className="text-sm font-semibold text-start py-4">Status</th>
            <th className="text-sm font-semibold text-start py-4">Actions</th>
          </tr>

          <tr className="border-b hover:bg-gray-100 transition-all duration-300">
            <td className="text-[13px] font-medium py-4 px-2">Jane Smith</td>
            <td className="text-[13px] font-medium py-4">John Doe</td>
            <td className="text-[13px] font-medium py-4">Harassment</td>
            <td className="text-[13px] font-medium py-4">24-04-2024</td>
            <td className="text-[13px] font-medium py-4">
              <span className="px-3 py-1.5 rounded-full text-[10px] text-red-500 bg-red-100">
                Unresolved
              </span>
            </td>
            <td>
              <button className="text-xs font-medium bg-[#0098EA] text-white px-4 py-2 rounded-lg" onClick={handleShowModal}>
                View
              </button>
              <ReportDetailsModal
                showModal={showModal}
                onclick={handleShowModal}
              />
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-100 transition-all duration-300">
            <td className="text-[13px] font-medium py-4 px-2">Jane Smith</td>
            <td className="text-[13px] font-medium py-4">John Doe</td>
            <td className="text-[13px] font-medium py-4">Harassment</td>
            <td className="text-[13px] font-medium py-4">24-04-2024</td>
            <td className="text-[13px] font-medium py-4">
              <span className="px-3 py-1.5 rounded-full text-[10px] text-red-500 bg-red-100">
                Unresolved
              </span>
            </td>
            <td>
              <button className="text-xs font-medium bg-[#0098EA] text-white px-4 py-2 rounded-lg" onClick={handleShowModal}>
                View
              </button>
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-100 transition-all duration-300">
            <td className="text-[13px] font-medium py-4 px-2">Jane Smith</td>
            <td className="text-[13px] font-medium py-4">John Doe</td>
            <td className="text-[13px] font-medium py-4">Harassment</td>
            <td className="text-[13px] font-medium py-4">24-04-2024</td>
            <td className="text-[13px] font-medium py-4">
              <span className="px-3 py-1.5 rounded-full text-[10px] text-red-500 bg-red-100">
                Unresolved
              </span>
            </td>
            <td>
              <button className="text-xs font-medium bg-[#0098EA] text-white px-4 py-2 rounded-lg" onClick={handleShowModal}>
                View
              </button>
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-100 transition-all duration-300">
            <td className="text-[13px] font-medium py-4 px-2">Jane Smith</td>
            <td className="text-[13px] font-medium py-4">John Doe</td>
            <td className="text-[13px] font-medium py-4">Harassment</td>
            <td className="text-[13px] font-medium py-4">24-04-2024</td>
            <td className="text-[13px] font-medium py-4">
              <span className="px-3 py-1.5 rounded-full text-[10px] text-red-500 bg-red-100">
                Unresolved
              </span>
            </td>
            <td>
              <button className="text-xs font-medium bg-[#0098EA] text-white px-4 py-2 rounded-lg" onClick={handleShowModal}>
                View
              </button>
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-100 transition-all duration-300">
            <td className="text-[13px] font-medium py-4 px-2">Jane Smith</td>
            <td className="text-[13px] font-medium py-4">John Doe</td>
            <td className="text-[13px] font-medium py-4">Harassment</td>
            <td className="text-[13px] font-medium py-4">24-04-2024</td>
            <td className="text-[13px] font-medium py-4">
              <span className="px-3 py-1.5 rounded-full text-[10px] text-red-500 bg-red-100">
                Unresolved
              </span>
            </td>
            <td>
              <button className="text-xs font-medium bg-[#0098EA] text-white px-4 py-2 rounded-lg" onClick={handleShowModal}>
                View
              </button>
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-100 transition-all duration-300">
            <td className="text-[13px] font-medium py-4 px-2">Jane Smith</td>
            <td className="text-[13px] font-medium py-4">John Doe</td>
            <td className="text-[13px] font-medium py-4">Harassment</td>
            <td className="text-[13px] font-medium py-4">24-04-2024</td>
            <td className="text-[13px] font-medium py-4">
              <span className="px-3 py-1.5 rounded-full text-[10px] text-red-500 bg-red-100">
                Unresolved
              </span>
            </td>
            <td>
              <button className="text-xs font-medium bg-[#0098EA] text-white px-4 py-2 rounded-lg" onClick={handleShowModal}>
                View
              </button>
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-100 transition-all duration-300">
            <td className="text-[13px] font-medium py-4 px-2">Jane Smith</td>
            <td className="text-[13px] font-medium py-4">John Doe</td>
            <td className="text-[13px] font-medium py-4">Harassment</td>
            <td className="text-[13px] font-medium py-4">24-04-2024</td>
            <td className="text-[13px] font-medium py-4">
              <span className="px-3 py-1.5 rounded-full text-[10px] text-red-500 bg-red-100">
                Unresolved
              </span>
            </td>
            <td>
              <button className="text-xs font-medium bg-[#0098EA] text-white px-4 py-2 rounded-lg" onClick={handleShowModal}>
                View
              </button>
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-100 transition-all duration-300">
            <td className="text-[13px] font-medium py-4 px-2">Jane Smith</td>
            <td className="text-[13px] font-medium py-4">John Doe</td>
            <td className="text-[13px] font-medium py-4">Harassment</td>
            <td className="text-[13px] font-medium py-4">24-04-2024</td>
            <td className="text-[13px] font-medium py-4">
              <span className="px-3 py-1.5 rounded-full text-[10px] text-red-500 bg-red-100">
                Unresolved
              </span>
            </td>
            <td>
              <button className="text-xs font-medium bg-[#0098EA] text-white px-4 py-2 rounded-lg" onClick={handleShowModal}>
                View
              </button>
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-100 transition-all duration-300">
            <td className="text-[13px] font-medium py-4 px-2">Jane Smith</td>
            <td className="text-[13px] font-medium py-4">John Doe</td>
            <td className="text-[13px] font-medium py-4">Harassment</td>
            <td className="text-[13px] font-medium py-4">24-04-2024</td>
            <td className="text-[13px] font-medium py-4">
              <span className="px-3 py-1.5 rounded-full text-[10px] text-red-500 bg-red-100">
                Unresolved
              </span>
            </td>
            <td>
              <button className="text-xs font-medium bg-[#0098EA] text-white px-4 py-2 rounded-lg" onClick={handleShowModal}>
                View
              </button>
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-100 transition-all duration-300">
            <td className="text-[13px] font-medium py-4 px-2">Jane Smith</td>
            <td className="text-[13px] font-medium py-4">John Doe</td>
            <td className="text-[13px] font-medium py-4">Harassment</td>
            <td className="text-[13px] font-medium py-4">24-04-2024</td>
            <td className="text-[13px] font-medium py-4">
              <span className="px-3 py-1.5 rounded-full text-[10px] text-red-500 bg-red-100">
                Unresolved
              </span>
            </td>
            <td>
              <button className="text-xs font-medium bg-[#0098EA] text-white px-4 py-2 rounded-lg" onClick={handleShowModal}>
                View
              </button>
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-100 transition-all duration-300">
            <td className="text-[13px] font-medium py-4 px-2">Jane Smith</td>
            <td className="text-[13px] font-medium py-4">John Doe</td>
            <td className="text-[13px] font-medium py-4">Harassment</td>
            <td className="text-[13px] font-medium py-4">24-04-2024</td>
            <td className="text-[13px] font-medium py-4">
              <span className="px-3 py-1.5 rounded-full text-[10px] text-red-500 bg-red-100">
                Unresolved
              </span>
            </td>
            <td>
              <button className="text-xs font-medium bg-[#0098EA] text-white px-4 py-2 rounded-lg" onClick={handleShowModal}>
                View
              </button>
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-100 transition-all duration-300">
            <td className="text-[13px] font-medium py-4 px-2">Jane Smith</td>
            <td className="text-[13px] font-medium py-4">John Doe</td>
            <td className="text-[13px] font-medium py-4">Harassment</td>
            <td className="text-[13px] font-medium py-4">24-04-2024</td>
            <td className="text-[13px] font-medium py-4">
              <span className="px-3 py-1.5 rounded-full text-[10px] text-red-500 bg-red-100">
                Unresolved
              </span>
            </td>
            <td>
              <button className="text-xs font-medium bg-[#0098EA] text-white px-4 py-2 rounded-lg" onClick={handleShowModal}>
                View
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default ReportList;

// => /reports/1234
