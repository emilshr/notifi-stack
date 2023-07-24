import { appRouter } from "@/server/api/root";
import { createInnerTRPCContext } from "@/server/api/trpc";
import { getServerAuthSession } from "@/server/auth";
import { Project } from "@prisma/client";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import SuperJSON from "superjson";
import { SectionHeader } from "../../SectionHeader";
import { SidePaneWrapper } from "../../SidePaneWrapper";
import { ProjectSectionWrapper } from "../../ProjectSectionWrapper";
import { SetSecret } from "./SetSecret";

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
