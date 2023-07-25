import type { Project } from "@prisma/client";

type Props = {
  project: Project;
};

export const ProjectDetails = ({ project }: Props) => {
  console.log({ project });
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-3xl font-bold">Project details</div>
    </div>
  );
};
