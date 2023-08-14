import { SectionHeader } from "@/components/SectionHeader";
import { SidePaneWrapper } from "@/components/SidePaneWrapper";
import { ProjectSectionWrapper } from "@/components/ProjectSectionWrapper";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { DataGrid } from "@/components/data-grid/DataGrid";
import { useState } from "react";

const columnHeaders = [
  {
    key: "location",
    label: "Location",
  },
  {
    key: "host",
    label: "Host",
  },
  {
    key: "cookies",
    label: "Cookies",
  },
  {
    key: "origin",
    label: "Origin",
  },
  {
    key: "source",
    label: "Source",
  },
  {
    key: "lineNo",
    label: "Line no",
  },
  {
    key: "colNo",
    label: "Column no",
  },
  {
    key: "message",
    label: "Message",
  },
  {
    key: "stack",
    label: "Stack",
  },
  {
    key: "createdAt",
    label: "Time-stamp",
  },
];

export default function ActivityView() {
  const router = useRouter();
  const { projectId } = router.query as { projectId: string };
  const [currentPage, setCurrentPage] = useState(0);

  const { data: rowCount = 0 } =
    api.projects.getProjectActivityPageCount.useQuery({
      projectId,
    });

  const { data, isLoading } = api.projects.getProjectActivities.useQuery({
    projectId,
    skip: currentPage * 10,
  });

  return (
    <SidePaneWrapper>
      <SectionHeader
        title="App activity"
        description="You can find all the errors that your application has encountered here"
      />
      <ProjectSectionWrapper
        sectionTitle="See all those (un)caught errors"
        sectionDescription="Hopefully the list is small"
      >
        <DataGrid
          columnHeaders={columnHeaders}
          data={data?.items ?? []}
          loading={isLoading}
          onPageChange={(updatedPage) => setCurrentPage(updatedPage)}
          itemKey="id"
          displayPagination
          rowCount={rowCount / 10}
        />
      </ProjectSectionWrapper>
    </SidePaneWrapper>
  );
}
