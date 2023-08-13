import { Card, CardHeader, CardBody } from "@nextui-org/react";

type Props = {
  apiCount: number;
};

export const ApiUsage = ({ apiCount }: Props) => {
  return (
    <Card
      classNames={{
        base: "p-2",
      }}
    >
      <CardHeader>
        <div className="flex flex-col gap-y-2">
          <span className="text-xl font-bold">API consumption</span>
          <span className="text-md text-slate-600 dark:text-slate-400">
            Number of keys issued
          </span>
        </div>
      </CardHeader>
      <CardBody>
        <span className="text-xl">{apiCount}</span>
      </CardBody>
    </Card>
  );
};
