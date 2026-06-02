import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axiosInterceptor from "../../axiosInterceptor";
import { GoArrowLeft } from "react-icons/go";

const hasAddressContent = (address) => {
  if (!address) return false;
  if (typeof address === "string") return address.trim().length > 0;
  return [
    address?.streetAddress,
    address?.apartment_suite,
    address?.city,
    address?.state,
    address?.country,
    address?.zipCode,
  ].some((part) => part && String(part).trim());
};

const formatAddress = (address) => {
  if (!address) return "—";
  if (typeof address === "string") return address.trim() || "—";
  const parts = [
    address?.streetAddress,
    address?.apartment_suite,
    address?.city,
    address?.state,
    address?.country,
    address?.zipCode,
  ].filter((part) => part && String(part).trim());
  return parts.length ? parts.join(", ") : "—";
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

const getImageUrl = (value) => {
  if (!value) return null;
  if (typeof value === "string") return value;
  return value?.url || value?.[0]?.url || null;
};

const InfoRow = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
      {label}
    </p>
    <p className="text-sm text-gray-800 break-words">{value || "—"}</p>
  </div>
);

const StatusBadge = ({ value }) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeClass(value)}`}
  >
    {formatStatus(value)}
  </span>
);

const ImagePreview = ({ src, alt, emptyText }) => {
  const [open, setOpen] = useState(false);

  if (!src) {
    return (
      <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white text-center text-[10px] leading-tight text-gray-400 px-1">
        {emptyText}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-block cursor-pointer"
        title="Click to view image"
      >
        <img
          src={src}
          alt={alt}
          className="h-24 w-24 rounded-lg border border-gray-200 object-cover bg-white hover:opacity-90 transition-opacity"
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-800 hover:bg-gray-100"
          >
            Close
          </button>
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-lg"
          />
        </div>
      )}
    </>
  );
};

export default function DetailOrder() {
  const { setLoader, loader } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const params = useParams("");
  const navigate = useNavigate();

  useEffect(() => {
    const getOrder = async () => {
      try {
        setLoader(true);
        const response = await axiosInterceptor.get("/admin/orders", {
          params: { page: 1 },
        });
        const found = (response?.data?.data || []).find(
          (item) => item._id == params.id
        );
        setOrder(found || null);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoader(false);
      }
    };

    getOrder();
  }, [params.id]);

  const buyer = order?.placerDetails;
  const buyerAddress =
    order?.deliveryAddress ||
    buyer?.deliveryAddresses?.[0] ||
    buyer?.address;

  const sellers =
    order?.sellersProducts?.map((sp) => {
      const products =
        sp?.fulfillmentMethods?.flatMap((fm) => fm?.products || []) || [];
      const nestedSeller = products
        .map((p) => p?.product?.seller)
        .find(Boolean);
      const productPickupAddress = products
        .map((p) => p?.product?.pickupAddress)
        .find((addr) => hasAddressContent(addr));

      const sellerAddress = hasAddressContent(nestedSeller?.pickupAddress)
        ? nestedSeller.pickupAddress
        : hasAddressContent(productPickupAddress)
          ? productPickupAddress
          : hasAddressContent(nestedSeller?.address)
            ? nestedSeller.address
            : nestedSeller?.deliveryAddresses?.[0];

      return {
        id: sp?.seller?.id || nestedSeller?._id,
        name: sp?.seller?.name || nestedSeller?.name,
        email: nestedSeller?.email?.value,
        address: sellerAddress,
      };
    }) || [];

  const uniqueSellers = sellers.filter(
    (seller, index, arr) =>
      seller?.id && arr.findIndex((s) => s.id === seller.id) === index
  );

  const deliveryStatus =
    order?.status ?? order?.shipment?.status ?? order?.delivery?.status;
  const escrowStatus = order?.escrowStatus ?? order?.escrow?.status;

  const trackingNumber =
    order?.shipment?.trackingId ||
    order?.shipment?.trackingNumber ||
    order?.shipment?.tracking ||
    order?.trackingNumber;

  const shippingPicture = getImageUrl(
    order?.shipment?.shippingProof ||
      order?.shipment?.shippingPicture ||
      order?.shipment?.image ||
      order?.shippingPicture
  );

  const proofOfDelivery = getImageUrl(
    order?.delivery?.deliveryProof ||
      order?.delivery?.proofOfDelivery ||
      order?.delivery?.image ||
      order?.proofOfDelivery
  );

  if (loader) {
    return (
      <div className="flex items-center justify-center py-40">
        <span className="loader"></span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="px-4 py-10 md:px-6">
        <button
          onClick={() => navigate("/order")}
          className="mb-4 inline-flex items-center gap-2 text-sm text-[#0098EA]"
        >
          <GoArrowLeft size={18} /> Back to Orders
        </button>
        <p className="text-gray-500">Order not found</p>
      </div>
    );
  }

  return (
    <div className="py-4 px-4 md:px-6 2xl:px-4 2xl:container 2xl:mx-auto space-y-6">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate("/order")}
          className="inline-flex w-fit items-center gap-2 text-sm text-[#0098EA] hover:opacity-80"
        >
          <GoArrowLeft size={18} /> Back to Orders
        </button>
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Order Detail</h1>
          <p className="mt-1 text-sm text-gray-500">Order ID: {order?._id}</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 md:p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Products</h2>
        <div className="space-y-4">
          {order?.sellersProducts?.map((sellerProduct) =>
            sellerProduct?.fulfillmentMethods?.map((method) =>
              method?.products?.length > 0
                ? method.products.map((item, i) => {
                    const displayImage =
                      item?.product?.images?.find((img) => img?.displayImage)
                        ?.url || item?.product?.images?.[0]?.url;

                    return (
                      <div
                        key={`${item?._id || i}`}
                        className="flex flex-col gap-4 border-b border-gray-200 pb-4 last:border-b-0 md:flex-row md:items-center"
                      >
                        <img
                          src={
                            displayImage ||
                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          }
                          alt={item?.product?.name || "product"}
                          className="h-24 w-24 rounded-lg object-cover"
                        />
                        <div className="flex-1 space-y-1">
                          <p
                            onClick={() => {
                              navigate(`/productDetail/${item?.product?._id}`, {
                                state: { data: item?.product },
                              });
                            }}
                            className="cursor-pointer text-base font-semibold text-gray-800 hover:text-[#0098EA]"
                          >
                            {item?.product?.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item?.product?.category} /{" "}
                            {item?.product?.subCategory}
                          </p>
                          <p className="text-sm text-gray-500">
                            Fulfillment:{" "}
                            {method.method === "selfPickup"
                              ? "Self Pickup"
                              : "Delivery"}
                          </p>
                        </div>
                        <div className="text-sm text-gray-700 md:text-right">
                          <p>Qty: {item?.quantity || 1}</p>
                          <p className="font-semibold">
                            ${item?.product?.price}
                          </p>
                        </div>
                      </div>
                    );
                  })
                : null
            )
          )}
        </div>
        <div className="mt-4 flex justify-end border-t border-gray-200 pt-4">
          <p className="text-base font-semibold text-gray-800">
            Total: ${order?.total}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 md:p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Buyer</h2>
          <InfoRow label="Name" value={buyer?.name} />
          <InfoRow label="Email" value={buyer?.email?.value} />
          <InfoRow label="Address" value={formatAddress(buyerAddress)} />
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 md:p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-800">Seller</h2>
          {uniqueSellers.length > 0 ? (
            uniqueSellers.map((seller) => (
              <div
                key={seller.id}
                className="space-y-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
              >
                <InfoRow label="Name" value={seller.name} />
                <InfoRow label="Email" value={seller.email} />
                <InfoRow
                  label="Address"
                  value={formatAddress(seller.address)}
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No seller details found</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 md:p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-800">Status</h2>
          <StatusBadge value={deliveryStatus} />
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 md:p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-800">Escrow Status</h2>
          <StatusBadge value={escrowStatus} />
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 md:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Tracking / Shipping
        </h2>
        <InfoRow label="Tracking Number" value={trackingNumber || "—"} />
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Shipping Picture
          </p>
          <ImagePreview
            src={shippingPicture}
            alt="Shipping"
            emptyText="No shipping picture available"
          />
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 md:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Proof of Delivery
        </h2>
        <ImagePreview
          src={proofOfDelivery}
          alt="Proof of delivery"
          emptyText="No proof of delivery available"
        />
      </div>
    </div>
  );
}
