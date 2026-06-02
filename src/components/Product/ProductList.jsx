import React, { useContext, useEffect, useState } from "react";
import ProductListItem from "./ProductListItem";
import BASE_URL from "../../constants/BaseUrl";
import { AuthContext } from "../../context/AuthContext";
import {
  FilterProductCategory,
  FilterProductStatus,
  FilterProductSubCategory,
  MultiRangeSlider,
} from "./Filter";
import axiosInterceptor from "../../axiosInterceptor";

const ProductList = ({ filterData, setFilterLength }) => {
  const [active, SetActive] = useState("products");
  const { isUserData, setLoader, loader } = useContext(AuthContext);
  const [Product, SetProduct] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const TOTAL_VALUES_PER_PAGE = 10;
  const [displayValue, setDisplayValue] = useState("Category");
  const [SubCategFill, setSubCategFill] = useState("Sub Category");
  const [showBoostModal, setShowBoostModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [boostDays, setBoostDays] = useState(7);
  const [update, setUpdate] = useState(false);
  const [boostedLoader, setBoostedLoader] = useState(false);
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoader(true);

        const response = await axiosInterceptor.get(
          `/admin/${active}`,
          {
            params: {
              name: filterData || "",
              category: displayValue === "Category" ? "" : displayValue,
              subCategory:
                SubCategFill !== "Sub Category" ? SubCategFill : "",
              page: 1,
            },
          }
        );

        SetProduct(response.data.data);
        setDataToDisplay(
          response?.data?.data?.slice(0, TOTAL_VALUES_PER_PAGE)
        );
        setFilterLength(response?.data?.totalProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoader(false);
      }
    };

    getProducts();
  }, [
    filterData,
    active,
    displayValue,
    SubCategFill,
    update,
  ]);

  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  };

  const goOnNextPage = () => {
    const totalPages = Math.ceil(Product.length / TOTAL_VALUES_PER_PAGE);
    if (currentPageNumber === totalPages) return;
    setCurrentPageNumber((prev) => prev + 1);
  };

  useEffect(() => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    setDataToDisplay(Product.slice(start, end));
  }, [currentPageNumber]);
  const handleBoostClick = (product) => {
    setSelectedProduct(product);
    setBoostDays(7);
    setShowBoostModal(true);
  };
  const confirmBoost = async () => {
    try {
      setBoostedLoader(true);

      await fetch(`${BASE_URL}/admin/boost-product`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${isUserData?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: selectedProduct?.seller?._id,
          productId: selectedProduct?._id,
          duration: String(boostDays),
        }),
      });

      setShowBoostModal(false);
      setUpdate((prev) => !prev);
    } catch (error) {
      console.error("Boost error:", error);
    } finally {
      setBoostedLoader(false);
    }
  };

  return (
    <>
      {/* <div className="mt-2  w-full grid-cols-2  flex items-center justify-end space-x-4 md:flex">
        <button
          onClick={() => SetActive("products")}
          className={`active:scale-95 rounded-md ${active == "products"
            ? "bg-[#0098EA] text-white"
            : "bg-gray-200 text-black"
            }  px-6 py-2 font-medium  outline-none focus:ring-gray-500 hover:opacity-90 text-sm`}
        >
          Active
        </button>
        <button
          onClick={() => SetActive("deactivated-products")}
          className={`active:scale-95 rounded-md px-6 ${active == "deactivated-products"
            ? "bg-[#0098EA] text-white"
            : "bg-gray-200 text-black"
            }  py-2 text-sm font-medium  outline-none focus:ring focus:ring-[#0098EA] hover:opacity-90 `}
        >
          Deactivated
        </button>
      </div> */}
      <div className="w-full overflow-x-auto h-[400px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
        <table className="w-full mt-4  border-collapse  text-left text-sm text-gray-500">
          <thead className="">
            <tr className="">
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-3 rounded-s-lg py-4 text-sm font-semibold"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                <FilterProductCategory
                  displayValue={displayValue}
                  setDisplayValue={setDisplayValue}
                  setSubCategFill={setSubCategFill}
                />

                {/* Category */}
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                <FilterProductSubCategory
                  displayValue={displayValue}
                  SubCategFill={SubCategFill}
                  setSubCategFill={setSubCategFill}
                />
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                <MultiRangeSlider
                  min={0}
                  max={100000}
                  dataToDisplay={dataToDisplay}
                  setDataToDisplay={setDataToDisplay}
                />
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                <FilterProductStatus SetActive={SetActive} />
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 text-sm font-semibold text-center"
              >
                Action
              </th>
            </tr>
          </thead>
          {loader ? (
            <span className="loader"></span>
          ) : (
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {dataToDisplay && dataToDisplay?.length > 0 ? (
                dataToDisplay?.map((item) => (
                  <ProductListItem
                    key={item.id}
                    item={item}
                    onBoost={handleBoostClick}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="100%"
                    className="text-center py-40 text-gray-500"
                  >
                    No products found
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
        {showBoostModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[350px]">
              <h2 className="text-lg font-semibold mb-4">Boost Product</h2>

              <p className="text-sm mb-4">
                Boost <b>{selectedProduct?.name}</b> for:
              </p>

              {[7, 14, 30].map((day) => (
                <label key={day} className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    checked={boostDays === day}
                    onChange={() => setBoostDays(day)}
                  />
                  {day} days
                </label>
              ))}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowBoostModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmBoost}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  {boostedLoader ? "Boosting..." : "Confirm Boost"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
