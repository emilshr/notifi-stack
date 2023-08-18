/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "@/utils/api";
import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export const ProjectListing = () => {
  const { data, isFetching } = api.projects.getProjects.useQuery({}, {});

  if (isFetching) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
      {data?.items.map((item) => {
        return (
          <div className="h-full w-full" key={item.id}>
            <Card
              isFooterBlurred
              radius="sm"
              isPressable
              classNames={{
                base: "h-full w-full min-h-[100px]",
              }}
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
                      height={300}
                      width={300}
                      className="aspect-square h-24 w-full object-cover"
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
          </div>
        );
      })}
    </div>
  );
};
