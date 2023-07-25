import type { PropsWithChildren } from "react";
import { ProjectSidePane } from "./ProjectSidePane";

export const SidePaneWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="xl:px-30 md:px-26 lg:px-30 flex w-full flex-col gap-y-4 px-0 sm:px-20">
      <div className="grid grid-cols-1 gap-x-4 lg:grid-cols-4">
        <ProjectSidePane />
        <div className="md:col-span-3">
          <div className="flex flex-col gap-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
