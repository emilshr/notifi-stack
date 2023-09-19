import { api } from "@/utils/api";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { PlanType } from "@prisma/client";
import { useSession } from "next-auth/react";

export const PaidTierCard = () => {
  const { mutate, isLoading } = api.account.upgradeAccount.useMutation();
  const { data } = useSession();

  return (
    <Card
      radius="md"
      classNames={{
        base: `${
          data?.user.planType === PlanType.PREMIUM
            ? "ring-1 ring-secondary-500 ring-offset-2 ring-offset-transparent"
            : ""
        } rounded-md gap-y-4 p-2`,
        header: "text-3xl font-extrabold text-primary-800",
        body: "p-3 text-base font-normal",
      }}
    >
      <CardHeader>
        <div className="flex w-full flex-col gap-y-2">
          <span>Pro</span>
          <span className="text-base font-normal text-default-700">
            For developers who have multiple projects hosted everywhere
          </span>
          <span className="pt-4 text-5xl">21.6$ yearly</span>
        </div>
      </CardHeader>
      <div className="px-3">
        <Divider />
      </div>
      <CardBody>
        <div className="flex flex-col gap-y-2">
          <ul className="list-disc pl-4 text-primary-700">
            <li>
              <span>Unlimited projects</span>
            </li>
            <li>
              <span>
                Errors from your project&apos;s inception will be stored.
              </span>
            </li>
            <li>
              <span>No rate limiting for your application</span>
            </li>
          </ul>
        </div>
      </CardBody>
      <CardFooter>
        <Button
          fullWidth
          variant="shadow"
          color="success"
          className="font-bold text-success-100"
          onClick={(event) => {
            event.stopPropagation();
            mutate();
          }}
          isLoading={isLoading}
          // disabled={isLoading}
        >
          Upgrade now
        </Button>
      </CardFooter>
    </Card>
  );
};
