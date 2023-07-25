import { appRouter } from "@/server/api/root";
import { createInnerTRPCContext } from "@/server/api/trpc";
import { getServerAuthSession } from "@/server/auth";
import type { Project } from "@prisma/client";
import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetServerSidePropsContext } from "next";
import type { ParsedUrlQuery } from "querystring";
import SuperJSON from "superjson";
import { SetSecret } from "../../../../components/project-dashboard/SetSecret";
import { ProjectSectionWrapper } from "@/components/ProjectSectionWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { SidePaneWrapper } from "@/components/SidePaneWrapper";

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

export default function Secrets() {
  return (
    <SidePaneWrapper>
      <SectionHeader
        title="Project API keys"
        description="View and manage your private API keys here"
      />
      <ProjectSectionWrapper
        sectionTitle="Configure your project secret"
        sectionDescription="This secret is used to hash your API private keys. We would recommend setting a secure secret"
      >
        <SetSecret />
      </ProjectSectionWrapper>
    </SidePaneWrapper>
  );
}
