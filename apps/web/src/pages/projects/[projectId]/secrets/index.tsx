import { ProjectSectionWrapper } from "@/components/ProjectSectionWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { SidePaneWrapper } from "@/components/SidePaneWrapper";
import { ApiKeyList } from "@/components/project-dashboard/ApiKeyList";
import { CreateNewApiKey } from "@/components/project-dashboard/CreateNewApiKey";
import { SecretConfiguration } from "@/components/project-dashboard/SecretConfiguration";
import { appRouter } from "@/server/api/root";
import { createInnerTRPCContext } from "@/server/api/trpc";
import { getServerAuthSession } from "@/server/auth";
import { Snippet } from "@nextui-org/react";
import { createServerSideHelpers } from "@trpc/react-query/server";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import SuperJSON from "superjson";

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

  const output = await ssg.projects.getSecretAndApiKeys.fetch({
    projectId,
  });

  if (!output) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(JSON.parse(JSON.stringify(output)) as typeof output),
      projectId,
    },
  };
};

export default function Secrets({
  apiKeys,
  projectSecret,
  projectId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <SidePaneWrapper>
      <SectionHeader
        title="Project API keys"
        description="View and manage your private API keys here"
      />
      <ProjectSectionWrapper
        sectionTitle="Project ID"
        sectionDescription="This is the ID to pass into the module to enable crash reports"
      >
        <Snippet hideSymbol>{projectId}</Snippet>
      </ProjectSectionWrapper>
      <SecretConfiguration {...projectSecret} />
      <ProjectSectionWrapper
        sectionTitle="Standard keys"
        sectionDescription="These keys will allow you to authenticate API requests"
        actionComponent={<CreateNewApiKey />}
      >
        <ApiKeyList apiKeys={apiKeys} projectId={projectId} />
      </ProjectSectionWrapper>
    </SidePaneWrapper>
  );
}
