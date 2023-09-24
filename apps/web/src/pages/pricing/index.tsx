import { CommonPaddingWrapper } from "@/components/CommonPaddingWrapper";
import { Listing } from "@/components/pricing/Listing";

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
        <Listing />
      </div>
    </CommonPaddingWrapper>
  );
}
