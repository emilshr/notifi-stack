import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { PlanType } from "@prisma/client";
import { useSession } from "next-auth/react";
import { AlertBanner } from "../AlertBanner";

export const FreeTierCard = () => {
  const { data } = useSession();
  return (
    <Card
      radius="md"
      classNames={{
        base: `${
          data?.user.planType === PlanType.HOBBY
            ? "ring-1 ring-secondary-500 ring-offset-2 ring-offset-transparent"
            : ""
        } rounded-md gap-y-4 p-2`,
        header: "text-3xl font-extrabold text-secondary-800",
        body: "p-3 text-base font-normal",
      }}
    >
      <CardHeader>
        <div className="flex w-full flex-col gap-y-2">
          <span>Hobby</span>
          <span className="text-base font-normal text-default-700">
            Free forever. However, few of the functionalities are limited
          </span>
          <span className="pt-4 text-5xl">0$</span>
        </div>
      </CardHeader>
      <div className="px-3">
        <Divider />
      </div>
      <CardBody>
        <div className="flex flex-col gap-y-2">
          <ul className="list-disc pl-4 text-secondary-700">
            <li>
              <span>3 free projects</span>
            </li>
            <li>
              <span>
                Errors which are older than 90 days will not be stored
              </span>
            </li>
            <li>
              <span>
                Threshold of 10 errors that can be reported in a minute
              </span>
            </li>
          </ul>
        </div>
      </CardBody>
      <CardFooter>
        <AlertBanner title="You're on Hobby tier right now" />
      </CardFooter>
    </Card>
  );
};
