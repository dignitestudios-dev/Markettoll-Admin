import { useEffect, useState } from "react";
import AffiliatePerformance from "../../components/affiliate/AffiliatePerformance";
import Stats from "../../components/affiliate/state";
import { IoIosArrowBack } from "react-icons/io";
import AllInfluencerRate from "../../components/affiliate/AllInfluencerRate";

export default function Affiliate() {
  const [totalAffiliate, setTotalAffiliate] = useState(false);
  const [linkActive, setLinkActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

 useEffect(()=>{
    const getVal=localStorage.getItem("influencer-rate");
    console.log(getVal,getVal=="false"?false:true,"valuess")
    setLinkActive(getVal=="false"?false:true);
 },[])

  return (
    <div className="w-full flex flex-col gap-y-4">
      {totalAffiliate && (
        <button
          className="absolute top-5 z-30"
          onClick={() => setTotalAffiliate(false)}
        >
          {" "}
          <IoIosArrowBack size={25} color="#666666" />{" "}
        </button>
      )}
      {!totalAffiliate && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold"> Affiliate</h1>
            <div className="flex flex-col gap-2 justify-center items-center space-x-3">
              <div>
                <span className="text-gray-700 mr-5 font-medium">
                  {linkActive ? "Manual" : "Auto"}
                </span>
                <button
                  onClick={async () => {
                     localStorage.setItem("influencer-rate", !linkActive);
                    setLinkActive(!linkActive);
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                    linkActive ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      linkActive ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              {linkActive && (
                <button
                  onClick={() => {
                   
                  }}
                  className="bg-[#0098EA] p-2 px-3 rounded-md text-white mt-3"
                >
                  Update Influencer Rate
                </button>
              )}
            </div>
          </div>

          <Stats
            setTotalAffiliate={setTotalAffiliate}
            totalAffiliate={totalAffiliate}
          />
        </>
      )}
      <AllInfluencerRate setShowModal={setShowModal} showModal={showModal} />
      <AffiliatePerformance totalAffiliate={totalAffiliate} />
    </div>
  );
}
