import { api } from "@/utils/api";
import { Card } from "flowbite-react";
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
          <Link href={`/projects/${item.id}`} key={item.id}>
            <Card className="h-full min-h-[200px] cursor-pointer border-slate-600 bg-transparent hover:border-slate-500 hover:bg-gradient-to-t hover:from-slate-900 hover:to-transparent">
              <div className="flex h-full flex-col justify-between">
                <div className="flex flex-col justify-start gap-y-2">
                  <h3 className="text-2xl font-bold">{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="flex w-full justify-end font-mono text-xs">
                  Created: {item.createdAt.toLocaleDateString()}
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};
