import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "@/server/api/root";
import { createInnerTRPCContext } from "@/server/api/trpc";
import SuperJSON from "superjson";
import { getServerAuthSession } from "@/server/auth";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import { SidePaneWrapper } from "../SidePaneWrapper";
import { GetStartedAlert } from "./GetStartedAlert";
import { CreateFirstKeyAlert } from "./CreateFirstKeyAlert";
import type { Project } from "@prisma/client";
import { SectionHeader } from "../SectionHeader";

interface ProjectQueryParams extends ParsedUrlQuery {
  projectId: string;
}

export const getServerSideProps = async ({
  req,
  res,
  params: { projectId } = { projectId: "" },
}: GetServerSidePropsContext<ProjectQueryParams>) => {
  const session = await getServerAuthSession({ req, res });
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session }),
    transformer: SuperJSON,
  });

  const project = await ssg.projects.getProject.fetch({
    projectId,
  });

  if (!project) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: { project: JSON.parse(JSON.stringify(project)) as Project },
  };
};

export default function ProjectView({
  project,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <SidePaneWrapper>
      <SectionHeader
        title="Project overview"
        description="All stats and figures about your project"
      />
      <GetStartedAlert />
      <CreateFirstKeyAlert projectId={project.id} />
    </SidePaneWrapper>
  );
}
