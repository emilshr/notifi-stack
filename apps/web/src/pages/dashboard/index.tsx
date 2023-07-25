import type { NextPage } from "next";
import { DashboardHeader } from "./header";
import { ProjectListing } from "./ProjectListing";

const Dashboard: NextPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-y-6">
      <DashboardHeader />
      <ProjectListing />
    </div>
  );
};

export default Dashboard;
