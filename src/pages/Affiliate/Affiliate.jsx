import { useState } from "react";
import AffiliatePerformance from "../../components/affiliate/AffiliatePerformance";
import Stats from "../../components/affiliate/state";
import { IoIosArrowBack } from "react-icons/io";

export default function Affiliate() {
  const [totalAffiliate, setTotalAffiliate] = useState(false);
  return (
    <div className="w-full flex flex-col gap-y-4">
      {totalAffiliate && (<button className="absolute top-5 z-30" onClick={()=>setTotalAffiliate(false)} > <IoIosArrowBack size={25} color="#666666" /> </button>)}
      {!totalAffiliate && (
        <>
          <h1 className="text-xl font-bold"> Affiliate</h1>
          <Stats
            setTotalAffiliate={setTotalAffiliate}
            totalAffiliate={totalAffiliate}
          />
        </>
      )   }
      <AffiliatePerformance totalAffiliate={totalAffiliate} />
    </div>
  );
}
