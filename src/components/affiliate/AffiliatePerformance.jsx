import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LuArrowUpDown } from "react-icons/lu";
import { BiChevronDown } from "react-icons/bi";

export default function AffiliatePerformance({ totalAffiliate }) {
  const { isUserData, setLoader, loader } = useContext(AuthContext);
  const [affiliate, setAffiliate] = useState([]);
  const [refDrop, setRefDrop] = useState(false);
  const [CommisionDrop, setCommisionDrop] = useState(false);
  const navigate = useNavigate("");
  const fetchInfluencer = () => {
    setLoader(!loader);
    try {
      const token = isUserData?.token;
      fetch(`${BASE_URL}/admin/get-influencers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res, "response");
          setAffiliate(res?.data);
          setLoader(false);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setLoader(false);
        });
    } catch (error) {
      console.log(error);
      toast.error("error.message");
    }
  };

  useEffect(() => {
    fetchInfluencer();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">
          {totalAffiliate ? "Total Affiliate" : "Affiliate Performance Table"}
        </h1>
        {!totalAffiliate && (
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              className="p-2 px-2 bg-[#FFFFFF] border border-[#E5E7EB] focus:outline-[#E5E7EB] rounded-[12px] "
              placeholder="Date"
            />
            <div className="relative">
              <input
                type="text"
                className="p-2 px-2 bg-[#FFFFFF] border focus:outline-[#E5E7EB] border-[#E5E7EB] rounded-[12px] "
                placeholder="Search"
              />
              <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-1">
                <button className="bg-[#0098EA] text-white  px-2 py-2 rounded-[10px]">
                  <CiSearch size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col mt-5">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#F2F2F2]">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      <div className="relative">
                        <button
                          onClick={() => setRefDrop(!refDrop)}
                          className="flex items-center justify-between w-full sm:w-50 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center">
                            <LuArrowUpDown className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-gray-700">
                              Total Referred Users
                            </span>
                          </div>
                          <BiChevronDown className="w-4 h-4 text-gray-500" />
                        </button>

                        {/* Static Dropdown Options (hidden by default) */}
                        <div
                          className={`absolute top-full left-0 w-full sm:w-50 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10  ${
                            refDrop ? "block" : "hidden"
                          } `}
                        >
                          <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700 rounded-t-lg">
                            Default Order
                          </button>
                          <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700">
                            Low to High
                          </button>
                          <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700">
                            High to Low
                          </button>
                        </div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Total Earnings
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Amount Paid
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      <div className="relative">
                        <button
                          onClick={() => setCommisionDrop(!CommisionDrop)}
                          className="flex items-center justify-between w-full sm:w-50 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center">
                            <LuArrowUpDown className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-gray-700">
                              Commission Rate
                            </span>
                          </div>
                          <BiChevronDown className="w-4 h-4 text-gray-500" />
                        </button>

                        {/* Static Dropdown Options (hidden by default) */}
                        <div
                          className={`absolute top-full left-0 w-full sm:w-50 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10  ${
                            CommisionDrop ? "block" : "hidden"
                          } `}
                        >
                          <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700 rounded-t-lg">
                            Default Order
                          </button>
                          <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700">
                            Low to High
                          </button>
                          <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700">
                            High to Low
                          </button>
                        </div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {affiliate && affiliate.length > 0 ? (
                    affiliate
                      .filter((item) => item.influencerStatus == "active")
                      .map((item, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            <div className="flex items-center gap-2">
                              <img
                                src={
                                  item?.profileImage
                                    ? item?.profileImage
                                    : "/circle.png"
                                }
                                className="w-10"
                                alt="circle.png"
                              />
                              <div>
                                <p className="text-[14px] font-[400] text-[#000000]">
                                  {item?.name}
                                </p>
                                <p className="text-[14px] font-[300] text-[#6B7280]">
                                  {item?.email?.value}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {item?.referredUsersCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            ${item?.totalEarning}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            ${item?.totalPaid}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            %{item?.influencerRate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            <img
                              src={
                                item?.adminStatus == "active"
                                  ? "/active.png"
                                  : item?.adminStatus == "blocked"
                                  ? "/block.png"
                                  : "/suspend.png"
                              }
                              alt="influencerStatus"
                              className="w-24"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <button
                              onClick={() =>
                                navigate(`/affiliate/${item?._id}`, {
                                  state: item,
                                })
                              }
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm p-2 rounded-[8px] text-white bg-[#0098EA]"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center px-6 py-4 text-sm text-gray-500"
                      >
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
