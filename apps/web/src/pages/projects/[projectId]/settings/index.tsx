import { appRouter } from "@/server/api/root";
import { createInnerTRPCContext } from "@/server/api/trpc";
import { getServerAuthSession } from "@/server/auth";
import { Project } from "@prisma/client";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import SuperJSON from "superjson";
import { SectionHeader } from "../../SectionHeader";
import { SidePaneWrapper } from "../../SidePaneWrapper";
import { GeneralSettings } from "./GeneralSettings";

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

  console.log(project);

  return {
    props: { project: JSON.parse(JSON.stringify(project)) as Project },
  };
};

export default function Settings({
  project,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <SidePaneWrapper>
      <SectionHeader
        title="Project settings"
        description="Configure the settings for the project"
      />
      <GeneralSettings project={project} />
    </SidePaneWrapper>
  );
}
