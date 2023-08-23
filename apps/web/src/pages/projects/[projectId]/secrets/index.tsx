import { ProjectSectionWrapper } from "@/components/ProjectSectionWrapper";
import { SectionHeader } from "@/components/SectionHeader";
import { SidePaneWrapper } from "@/components/SidePaneWrapper";
import { ApiKeyList } from "@/components/project-dashboard/ApiKeyList";
import { CreateNewApiKey } from "@/components/project-dashboard/CreateNewApiKey";
import { SecretConfiguration } from "@/components/project-dashboard/SecretConfiguration";
import { api } from "@/utils/api";
import { Snippet } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Secrets() {
  const {
    query: { projectId },
    push,
  } = useRouter();
  const { data, isFetched } = api.projects.getSecretAndApiKeys.useQuery({
    projectId: projectId as string,
  });

  useEffect(() => {
    if (isFetched && !data) {
      push("/404");
    }
  }, [isFetched, data, push]);

  if (!data) {
    return <></>;
  }

  const { apiKeys, projectSecret } = data;

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
        <ApiKeyList apiKeys={apiKeys} projectId={projectId as string} />
      </ProjectSectionWrapper>
    </SidePaneWrapper>
  );
}
