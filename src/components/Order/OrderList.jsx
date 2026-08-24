import React, { useContext, useEffect, useState } from "react";
import OrderListItem from "./OrderListItem";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";
import axiosInterceptor from "../../axiosInterceptor";

const OrderList = ({ filterData, setOrderCount }) => {
  const { isUserData, setLoader, loader } = useContext(AuthContext);
  const [Order, SetOrder] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const TOTAL_VALUES_PER_PAGE = 10;
  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoader(true);

        const response = await axiosInterceptor.get("/admin/orders", {
          params: {
            name: filterData || "",
            page: 1,
          },
        });

        console.log(response?.data?.data, "orderss");

        SetOrder(response?.data?.data || []);
        setDataToDisplay(response?.data?.data || []);
        setOrderCount(response?.data?.ordersCount || 0);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoader(false);
      }
    };

    getOrders();
  }, [filterData]);
  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  };

  const goOnNextPage = () => {
    const totalPages = Math.ceil(Order.length / TOTAL_VALUES_PER_PAGE);
    if (currentPageNumber === totalPages) return;
    setCurrentPageNumber((prev) => prev + 1);
  };
  useEffect(() => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    setDataToDisplay(Order.slice(start, end));
  }, [currentPageNumber]);

  return (
    <>
      <div className="w-full overflow-x-auto h-[600px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
        <table className="w-full border-collapse  text-left text-sm text-gray-500">
          <thead className="">
            <tr className="">
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-3 rounded-s-lg py-3 text-sm font-semibold"
              >
                Buyer Name
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-3 text-sm font-semibold"
              >
                Seller Name
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-3 text-sm font-semibold"
              >
                Product Purchased
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 text-nowrap xl:px-2  py-3 text-sm font-semibold"
              >
                Delivery Status
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-3 text-sm font-semibold"
              >
                Escrow Status
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 rounded-e-lg py-3 text-sm font-semibold"
              >
                Action
              </th>
            </tr>
          </thead>
          {loader ? (
            <span className="loader"></span>
          ) : (
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {dataToDisplay && dataToDisplay.length > 0 ? (
                dataToDisplay.map((item, i) => (
                  <OrderListItem key={i} item={item} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="100%"
                    className="text-center py-40 text-gray-500"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
      <div className="flex justify-end gap-3 w-full">
        <button
          className={`${currentPageNumber === 1 ? " bg-[#9fdeff]" : " bg-[#0098EA]"
            } px-2 rounded-md w-[80px] text-white py-2 `}
          onClick={goOnPrevPage}
        >
          Prev
        </button>
        <button
          className="bg-[#0098EA] px-2 rounded-md w-[80px] text-white py-2"
          onClick={goOnNextPage}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default OrderList;
