import AffiliatePerformance from "../../components/affiliate/AffiliatePerformance";
import Stats from "../../components/affiliate/state";

export default function Affiliate() {
  return (
    <div className="w-full flex flex-col gap-y-4">
      <h1 className="text-xl font-bold">Affiliate</h1>
      <Stats />
      <AffiliatePerformance/>
    </div>
  );
}
