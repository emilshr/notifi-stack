/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "@/utils/api";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProjectListing = () => {
  const [cursor, setCursor] = useState<string | undefined>(undefined);

  const { data, isFetched } = api.projects.getProjects.useQuery({
    cursor,
  });

  useEffect(() => {
    if (data) {
      const { nextCursor } = data;
      setCursor(nextCursor);
    }
  }, [isFetched, data]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {data?.items.map((item) => {
        return (
          <Card
            isFooterBlurred
            className="h-full min-h-[200px]"
            key={item.id}
            radius="sm"
            isPressable
          >
            <Link
              href={`/projects/${item.id}`}
              key={item.id}
              className="h-full w-full"
            >
              <div className="h-full w-full cursor-pointer">
                <CardHeader className="w-full bg-white/30 p-0 backdrop-blur-md">
                  <Image
                    alt="Card background"
                    src={item.backgroundUrl}
                    height={250}
                    width={250}
                    className="aspect-square h-52 w-full object-cover"
                  />
                </CardHeader>
                <CardBody className="cursor-pointer flex-col items-start gap-y-1">
                  <p className="line-clamp-1 text-large font-bold">
                    {item.name}
                  </p>
                  <small className="text-default-500">
                    {item.createdAt.toLocaleDateString()}
                  </small>
                  <h4 className="line-clamp-2 text-tiny font-bold">
                    {item.description}
                  </h4>
                </CardBody>
              </div>
            </Link>
          </Card>
        );
      })}
    </div>
  );
};
