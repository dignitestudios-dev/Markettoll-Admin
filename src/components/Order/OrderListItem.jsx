import React from "react";
import { useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";

const getSellerNames = (sellersProducts = []) => {
  const names = sellersProducts
    .map((sp) => sp?.seller?.name)
    .filter(Boolean);
  return [...new Set(names)].join(", ") || "—";
};

const getProductNames = (sellersProducts = []) => {
  const names = [];
  sellersProducts.forEach((sp) => {
    sp?.fulfillmentMethods?.forEach((fm) => {
      fm?.products?.forEach((p) => {
        if (p?.product?.name) names.push(p.product.name);
      });
    });
  });
  return names.length ? names.join(", ") : "—";
};

const formatStatus = (value) => {
  if (value === null || value === undefined || value === "") return "PENDING";
  return String(value).replace(/[_-]/g, " ").trim().toUpperCase();
};

const getStatusBadgeClass = (value) => {
  const status = formatStatus(value);
  if (status.includes("DELIVER")) {
    return "bg-green-100 text-green-700";
  }
  if (status.includes("PENDING") || status.includes("WAITING")) {
    return "bg-yellow-100 text-yellow-700";
  }
  if (
    status.includes("SHIP") ||
    status.includes("OUT FOR DELIVERY") ||
    status.includes("IN TRANSIT")
  ) {
    return "bg-blue-100 text-blue-700";
  }
  if (status.includes("CANCEL") || status.includes("FAIL") || status.includes("REJECT")) {
    return "bg-red-100 text-red-700";
  }
  return "bg-gray-100 text-gray-700";
};

const OrderListItem = ({ item }) => {
  const navigate = useNavigate("");

  const deliveryStatus =
    item?.status ?? item?.shipment?.status ?? item?.delivery?.status;
  const escrowStatus = item?.escrowStatus ?? item?.escrow?.status;

  const goToDetail = (e) => {
    e.stopPropagation();
    navigate(`/OrderDetail/${item?._id}`);
  };

  return (
    <tr className="hover:bg-gray-50">
      <th className="px-6 lg:px-4 xl:px-3 flex gap-3 py-4 font-normal text-gray-900">
        <div className="text-sm">
          <div className="font-medium text-gray-700">
            {item?.placerDetails?.name || "—"}
          </div>
        </div>
      </th>
      <td className="px-6 lg:px-4 xl:px-3 py-4">
        {getSellerNames(item?.sellersProducts)}
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4 text-xs max-w-[220px]">
        <span className="line-clamp-2">
          {getProductNames(item?.sellersProducts)}
        </span>
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(deliveryStatus)}`}
        >
          {formatStatus(deliveryStatus)}
        </span>
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(escrowStatus)}`}
        >
          {formatStatus(escrowStatus)}
        </span>
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">
        <button
          type="button"
          onClick={goToDetail}
          title="View order detail"
          className="inline-flex items-center justify-center rounded-md p-2 text-[#0098EA] hover:bg-[#0098EA]/10 transition-colors"
        >
          <LuEye size={18} />
        </button>
      </td>
    </tr>
  );
};

export default OrderListItem;
