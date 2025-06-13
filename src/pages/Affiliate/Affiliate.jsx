import { useState } from "react";
import AffiliatePerformance from "../../components/affiliate/AffiliatePerformance";
import Stats from "../../components/affiliate/state";
import { IoIosArrowBack } from "react-icons/io";
import AllInfluencerRate from "../../components/affiliate/AllInfluencerRate";

export default function Affiliate() {
  const [totalAffiliate, setTotalAffiliate] = useState(false);
  const [linkActive, setLinkActive] = useState(false);
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
          <div className="flex items-center justify-between" >
            <h1 className="text-xl font-bold"> Affiliate</h1>
            <div className="flex items-center space-x-3">
              <span className="text-gray-700 font-medium">
                {linkActive
                  ? "Disable Influencer Rate"
                  : "Enable Influencer Rate"}
              </span>

              <button
                onClick={async () => {
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
          </div>
          <Stats
            setTotalAffiliate={setTotalAffiliate}
            totalAffiliate={totalAffiliate}
          />
        </>
      )}
      <AllInfluencerRate setShowModal={setLinkActive} showModal={linkActive} />
      <AffiliatePerformance totalAffiliate={totalAffiliate} />
    </div>
  );
}
