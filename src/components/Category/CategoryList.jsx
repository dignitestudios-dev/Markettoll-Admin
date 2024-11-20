import React, { useContext, useEffect, useState } from "react";
import CategoryListItem from "./CategoryListItem";
import BASE_URL from "../../constants/BaseUrl";
import { AuthContext } from "../../context/AuthContext";

const CategoryList = () => {

  const { isUserData } = useContext(AuthContext);
  const [Categories,SetCategories]=useState([]);
  
  useEffect(() => {
    const token = isUserData?.token; 
    fetch(`${BASE_URL}/users/product-categories`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json", 
      }
    })
      .then((res) => res.json())
      .then((res) => {
        SetCategories(res?.data)
        console.log(res.data,"categories");
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [isUserData]);
   
  return (
    <div className="w-full overflow-x-auto h-[600px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
      <table className="w-full border-collapse  text-left text-sm text-gray-500">
        <thead className="">
        <tr className="">
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-3 rounded-s-lg py-4 text-sm font-semibold"
            >
              Image
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-3  py-4 text-sm font-semibold"
            >
              Category Name
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2  rounded-r-lg py-4 text-sm font-semibold"
            >
              Sub Category
            </th>          
            {/* <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2  rounded-r-lg py-4 text-sm font-semibold text-center"
            >Actions</th> */}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {
          Categories?.map((item)=>(
            <CategoryListItem item={item} />      
          ))
        }  
        
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
 