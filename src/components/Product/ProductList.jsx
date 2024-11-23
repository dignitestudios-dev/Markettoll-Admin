import React, { useContext, useEffect, useState } from "react";
import ProductListItem from "./ProductListItem";
import BASE_URL from "../../constants/BaseUrl";
import { AuthContext } from "../../context/AuthContext";

const ProductList = ({ filterData }) => {
  const [active, SetActive] = useState("active");
  const { isUserData, setLoader } = useContext(AuthContext);
  const [Product, SetProduct] = useState([]);
  const [Filter, SetFilter] = useState([]);

  useEffect(() => {
    setLoader(true)
    const token = isUserData?.token;
    fetch(`${BASE_URL}/admin/products?name=${filterData || ''}&page=1`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((res) => {
        SetProduct(res.data);
        setLoader(false)
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false)
      });
  }, [isUserData, filterData]);

  useEffect(() => {
    const filterProduct = Product?.filter((item) => item.status == active);
    SetFilter(filterProduct)
  }, [Product, active])

  return (
    <>
      <div className="mt-2  w-full grid-cols-2  flex items-center justify-end space-x-4 md:flex">
        <button
          onClick={() => SetActive("active")}
          className={`active:scale-95 rounded-md ${active == "active"
            ? "bg-[#0098EA] text-white"
            : "bg-gray-200 text-black"
            }  px-6 py-2 font-medium  outline-none focus:ring-gray-500 hover:opacity-90 text-sm`}
        >
          Active
        </button>
        <button
          onClick={() => SetActive("deactive")}
          className={`active:scale-95 rounded-md px-6 ${active == "deactive"
            ? "bg-[#0098EA] text-white"
            : "bg-gray-200 text-black"
            }  py-2 text-sm font-medium  outline-none focus:ring focus:ring-[#0098EA] hover:opacity-90 `}
        >
          Deactivated
        </button>
      </div>

      <div className="w-full overflow-x-auto h-[600px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">

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
                Category
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                Sub Category
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                Description
              </th>

              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
              >
                Seller Name
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 text-sm font-semibold"
              >
                Seller Email
              </th>

              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 rounded-r-lg  py-4 text-sm font-semibold"
              >Action
              </th>

            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {
              Filter?.map((item) => (
                <ProductListItem item={item} />
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;
