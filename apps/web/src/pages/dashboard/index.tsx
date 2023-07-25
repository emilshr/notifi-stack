import { DashboardHeader } from "@/components/dashboard/header";
import { ProjectListing } from "@/components/dashboard/ProjectListing";
import type { NextPage } from "next";

const Dashboard: NextPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-y-6">
      <DashboardHeader />
      <ProjectListing />
    </div>
  );
};

export default Dashboard;
