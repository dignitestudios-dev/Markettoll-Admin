import React, { useContext, useEffect, useState } from "react";
import SubscriptionListItem from "./SubscriptionListItem";
import PackagesListItem from "./PackagesListItem";
import BASE_URL from "../../constants/BaseUrl";
import { AuthContext } from "../../context/AuthContext";

const SubscriptionList = () => {

  const [ActiveSubscription, SetActiveSubscription] = useState([]);
  const [BoostingPackage, SetBoostingPackage] = useState([]);

  const { isUserData, setLoader } = useContext(AuthContext);
  useEffect(() => {
    setLoader(true)
    const token = isUserData?.token;
    const FetchSubscriptions=()=>{
      fetch(`${BASE_URL}/admin/active-subscriptions?subscription=-1&page=1`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
        .then((res) => res.json())
        .then((res) => {
          
          SetActiveSubscription(res.data);
          setLoader(false)
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setLoader(false)
        });
    }
    const FetchBoostingPackage=()=>{
      fetch(`${BASE_URL}/admin/active-boosts?boost=-1&page=1`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.data,"data -->");
          
          SetBoostingPackage(res.data);
          setLoader(false)
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setLoader(false)
        });
    }

    FetchBoostingPackage();
    FetchSubscriptions();

   
  }, [isUserData]);


  return (
    <div className="w-full flex flex-col gap-6 mt-6">
      <div className="w-full overflow-x-auto h-[500px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="">
            <tr className="">
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-3 rounded-s-lg  py-4 text-sm font-semibold"
              >
                User
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 text-sm font-semibold"
              >
                Package
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 text-sm font-semibold"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 text-sm font-semibold"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 rounded-r-lg text-sm font-semibold"
              >
                Purchase Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y  divide-gray-100 border-t border-gray-100">
            {
              ActiveSubscription?.map((item)=>(
                <SubscriptionListItem  item={item}/>
              ))
            }
          </tbody>
        </table>
      </div>
      <h1 className="text-xl font-bold">Boosting Packages Report</h1>      
      <div className="w-full overflow-x-auto h-[500px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="">
            <tr className="">
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-3 rounded-s-lg  py-4 text-sm font-semibold"
              >
                User
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 text-sm font-semibold"
              >
                Package
              </th>
              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 text-sm font-semibold"
              >
                Amount
              </th>

              <th
                scope="col"
                className="px-6 lg:px-4 xl:px-2 py-4 rounded-r-lg text-sm font-semibold"
              >
                Purchase Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y  divide-gray-100 border-t border-gray-100">
          {BoostingPackage?.map((item)=>(
            <PackagesListItem item={item} />
          ))}
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionList;
