import { SectionHeader } from "@/components/SectionHeader";
import { SidePaneWrapper } from "@/components/SidePaneWrapper";
import { GeneralSettings } from "@/components/project-dashboard/GeneralSettings";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Settings() {
  const {
    query: { projectId },
    push,
  } = useRouter();
  const { data, isFetched } = api.projects.getProject.useQuery({
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

  return (
    <SidePaneWrapper>
      <SectionHeader
        title="Project settings"
        description="Configure the settings for the project"
      />
      <GeneralSettings project={data} />
    </SidePaneWrapper>
  );
}
