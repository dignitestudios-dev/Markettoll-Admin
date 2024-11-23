import React, { useContext, useEffect, useState } from "react";
import OrderListItem from "./OrderListItem";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";

const OrderList = ({ filterData }) => {
  const { isUserData, setLoader } = useContext(AuthContext);
  const [Order, SetOrder] = useState([]);
  useEffect(() => {
    setLoader(true)
    const token = isUserData?.token;
    fetch(`${BASE_URL}/admin/orders?name=${filterData || ''}&page=1`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data, "orderss");

        SetOrder(res.data);
        setLoader(false)
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false)
      });
  }, [isUserData, filterData]);
  return (
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
              Buyer Email
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2  py-3 text-sm font-semibold"
            >
              Delivery Address{" "}
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2  py-3 text-sm font-semibold"
            >
              Total Price
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2  py-3 text-sm font-semibold"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {Order?.map((item) => (
            <OrderListItem item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
