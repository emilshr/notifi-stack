import { CommonPaddingWrapper } from "@/components/CommonPaddingWrapper";
import { FreeTierCard } from "@/components/pricing/FreeTierCard";
import { PaidTierCard } from "@/components/pricing/PaidTierCard";

export default function Page() {
  return (
    <CommonPaddingWrapper>
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-4">
        <div className="flex flex-col items-start gap-y-2 sm:items-center">
          <span className="text-4xl font-extrabold">Pricing</span>
          <span className="text-lg text-default-400">
            Plans that empower you to ship without friction.
          </span>
        </div>
        <div className="grid h-full grid-cols-1 items-center justify-center gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-y-0">
          <FreeTierCard />
          <PaidTierCard />
        </div>
      </div>
    </CommonPaddingWrapper>
  );
}
