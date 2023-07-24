import { PropsWithChildren } from "react";

type Props = {
  sectionTitle: string;
  sectionDescription?: string;
};

export const ProjectSectionWrapper = ({
  children,
  sectionTitle,
  sectionDescription,
}: PropsWithChildren<Props>) => {
  return (
    <div className="rounded-md border-[1px] border-slate-700 p-4 hover:border-slate-500 focus:border-slate-500">
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-1">
          <div className="text-xl font-semibold">{sectionTitle}</div>
          <div className="text-sm text-slate-500">{sectionDescription}</div>
        </div>
        {children}
      </div>
    </div>
  );
};
