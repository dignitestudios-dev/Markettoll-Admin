import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReportDetailsModal from "./ReportDetailsModal";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";

const ReportList = () => {
  const [showModal, setShowModal] = useState(false);
  const { isUserData, setLoader } = useContext(AuthContext);
  const [Reported, SetReported] = useState([]);
  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setLoader(true)
    const token = isUserData?.token;
    fetch(`${BASE_URL}/admin/reported-users?page=1`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        SetReported(res?.data);
        console.log(res, "reportedAccounts");
        setLoader(false)
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false)
      });
  }, [isUserData]);

  const handleBlockUser = (id) => {
    const token = isUserData?.token;
    fetch(`${BASE_URL}/admin/block-user/${id}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to Block User');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);

      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  return (
    <div className="w-full mt-4">
      <div className="w-full">
        <table className="w-full text-start overflow-x-scroll border">
          <tr className="border-b border-t bg-gray-100">
            <th className="text-sm font-semibold text-start py-4 md:pl-2">
            Reported User
            </th>
            <th className="text-sm font-semibold text-start py-4">
            Reported By
            </th>
            <th className="text-sm font-semibold text-start py-4">Category</th>
            <th className="text-sm font-semibold text-start py-4">Reason</th>
            <th className="text-sm font-semibold text-start py-4">Date</th>
            <th className="text-sm font-semibold text-start py-4">Actions</th>
          </tr>

          {Reported?.map((item) => (
            <tr className="border-b hover:bg-gray-100 transition-all duration-300">
              <td className="text-[13px] font-medium py-4 px-2">{item?.reporter?.name}</td>
              <td className="text-[13px] font-medium py-4">{item?.reportedUser?.name}</td>
              <td className="text-[13px] font-medium py-4">Category</td>
              <td className="text-[13px] font-medium py-4">{item?.selectedReason}</td>
              <td className="text-[13px] font-medium py-4">{new Date(item?.createdAt).toLocaleDateString()}</td>

              <td>
                <button
                  className="text-xs font-medium bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleBlockUser(item?.reportedUser?._id)}
                >
                  Block
                </button>
                {/* <ReportDetailsModal
                  showModal={showModal}
                  onclick={handleShowModal}
                /> */}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ReportList;

// => /reports/1234
