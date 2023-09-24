import { Badge, Chip, Tab, Tabs } from "@nextui-org/react";
import { FreeTierCard } from "./FreeTierCard";
import { PaidTierCard } from "./PaidTierCard";
import type { PricingVariants } from "./types";

const tabs: { variant: PricingVariants }[] = [
  {
    variant: "Monthly",
  },
  {
    variant: "Yearly",
  },
];

const TabLabel = ({ variant }: { variant: PricingVariants }) => {
  if (variant === "Monthly") {
    return <span>Monthly</span>;
  }
  return (
    <span className="flex items-center gap-x-2">
      Yearly
      <Chip color="primary">10% discount</Chip>
    </span>
  );
};

export const Listing = () => {
  return (
    <Tabs variant="bordered" items={tabs} aria-label="Pricing tiers">
      {({ variant }) => (
        <Tab key={variant} title={<TabLabel variant={variant} />}>
          <div className="grid h-full grid-cols-1 items-center justify-center gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-y-0">
            <FreeTierCard />
            <PaidTierCard variant={variant} />
          </div>
        </Tab>
      )}
    </Tabs>
  );
};
