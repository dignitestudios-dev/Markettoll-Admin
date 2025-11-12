import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { GoArrowLeft } from "react-icons/go";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductReviewsList from "../components/ProductDetail/ProductReviewsList";
import ProductSeller from "../components/ProductDetail/ProductSeller";
import ProductOrder from "../components/ProductDetail/ProductOrder";
import {
  ErrorToast,
  SuccessToast,
} from "../components/Global/ToasterContainer";
import BASE_URL from "../constants/BaseUrl";
import axios from "axios";
import Cookies from "js-cookie";
export default function ProductDetail() {
 const loc = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loc?.state?.data) {
      navigate("/products");
    }
  }, [loc, navigate]);

  const token = JSON.parse(Cookies.get("data"))?.token;
  const product = loc?.state?.data;
  const productId = product?._id;

  // 🧩 Deactivate Product Function
  const handleDeactivate = async () => {
    if (!productId) return ErrorToast("Product ID not found!");

    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/admin/deactivate-product/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.data?.success || res?.status === 200) {
        SuccessToast("Product deactivated successfully!");
        navigate("/products");
      } else {
        ErrorToast(res?.data?.message || "Failed to deactivate product.");
      }
    } catch (error) {
      console.error("Deactivate Error:", error);
      ErrorToast(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // 🧩 Activate Product Function
  const handleActivate = async () => {
    if (!productId) return ErrorToast("Product ID not found!");

    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/admin/activate-product/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.data?.success || res?.status === 200) {
        SuccessToast("Product activated successfully!");
        navigate("/products");
      } else {
        ErrorToast(res?.data?.message || "Failed to activate product.");
      }
    } catch (error) {
      console.error("Activate Error:", error);
      ErrorToast(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const isBlocked = product?.adminStatus === "blocked";
  return (
    <div className="w-full relative">
      <div className="w-full p-4 rounded-[30px] bg-[#F7F7F7]">
        <div className="w-full p-6 rounded-[30px] bg-[#ffff]">
          <div className="flex items-center justify-between">
            <Link to="/products" className="flex items-center gap-1 mb-5">
              <GoArrowLeft className="text-xl" />
              <span className="font-medium text-sm text-[#5C5C5C]">Back</span>
            </Link>
           {isBlocked ? (
              <button
                onClick={handleActivate}
                disabled={loading}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs disabled:opacity-60"
              >
                {loading ? "Activating..." : "Activate"}
              </button>
            ) : (
              <button
                onClick={handleDeactivate}
                disabled={loading}
                className="px-4 py-2 bg-[#0098EA] hover:opacity-80 text-white rounded-md text-xs disabled:opacity-60"
              >
                {loading ? "Deactivating..." : "Deactivate"}
              </button>
            )}
          </div>
          <div className="w-full mt-2 flex flex-col lg:flex-row justify-start gap-x-8 gap-y-6">
            <div className="w-full relative">
              <img
                src={loc?.state?.data?.images[0].url}
                alt="product image"
                className="w-full h-auto lg:h-[376px] object-cover rounded-xl"
              />
              <div className="w-full grid grid-cols-4 mt-3 gap-3">
                {/* {product?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image?.url}
                    alt={`Thumbnail ${index + 1}`}
                    className={`rounded-xl h-[97px] w-full object-cover cursor-pointer ${
                      image?.url === displayImage?.url
                        ? "border-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => handleThumbnailClick(image)}
                  />
                ))} */}
              </div>
            </div>
            <div className="w-full flex flex-col items-start gap-5">
              <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between">
                <h2 className="text-[20px] blue-text font-bold">
                  {loc?.state?.data?.name}
                </h2>
                <h3 className="text-[24px] font-bold">
                  ${loc?.state?.data?.price}
                </h3>
              </div>
              <div className="w-full border" />
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8">
                <div className="grid grid-cols-2 gap-y-3">
                  <p className="text-[13px] text-[#7C7C7C] font-medium">City</p>
                  <p className="text-[13px] font-medium">
                    {loc?.state?.data?.city}
                  </p>
                  <p className="text-[13px] text-[#7C7C7C] font-medium">
                    Category
                  </p>
                  <p className="text-[13px] font-medium">
                    {loc?.state?.data?.category}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-y-3">
                  <p className="text-[13px] text-[#7C7C7C] font-medium">
                    State
                  </p>
                  <p className="text-[13px] font-medium">
                    {loc?.state?.data?.state}
                  </p>
                  <p className="text-[13px] text-[#7C7C7C] font-medium">
                    Sub Category
                  </p>
                  <p className="text-[13px] font-medium">
                    {loc?.state?.data?.subCategory}
                  </p>
                </div>
              </div>
              <div className="w-full border" />
              <div className="w-full">
                <p className="text-[16px] text-[#003DAC] font-bold mb-3">
                  Description
                </p>
                <p className="text-[14px] font-normal">
                  {loc?.state?.data?.description}
                </p>
              </div>
              <div className="w-full border" />
              <ProductSeller seller={loc?.state?.data?.seller} />
              <div className="w-full border" />
            </div>
          </div>
          <div className="mt-3">
            <h1 className="font-semibold mb-3 text-xl">Product Orders</h1>
            <ProductOrder Producid={loc?.state?.data._id} />
          </div>
          <div className="mt-16 ">
            <h1 className="font-semibold mb-3 text-xl">Product Reviews</h1>
            <ProductReviewsList Producid={loc?.state?.data._id} />
          </div>
        </div>
      </div>
    </div>
  );
}
