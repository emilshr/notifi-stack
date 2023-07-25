import { Sidebar } from "flowbite-react";
import { useRouter } from "next/router";
import { twJoin } from "tailwind-merge";
import { MobileNavigation } from "./MobileNavigation";

export const ProjectSidePane = () => {
  const router = useRouter();
  const { projectId } = router.query as { projectId: string };

  const paths = (router || "").pathname.split("/");
  const currentTab = paths.length > 0 ? paths[paths.length - 1] : "";

  return (
    <>
      <Sidebar
        aria-label="Notifi sidebar"
        className="hidden bg-transparent text-slate-300 dark:bg-transparent lg:block"
        theme={{
          root: {
            inner: "bg-transparent",
          },
          item: {
            active: "text-slate-900",
          },
          items: "text-slate-300",
          itemGroup: "text-slate-300",
        }}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              active={currentTab === "[projectId]"}
              className={twJoin([
                "cursor-pointer font-semibold hover:bg-opacity-75 hover:text-slate-900",
                currentTab === "[projectId]" ? "" : "text-slate-300",
              ])}
              onClick={() => router.push(`/projects/${projectId}`)}
            >
              Overview
            </Sidebar.Item>
            <Sidebar.Item
              active={currentTab === "secrets"}
              className={twJoin([
                "cursor-pointer font-semibold hover:bg-opacity-75 hover:text-slate-900",
                currentTab === "secrets" ? "" : "text-slate-300",
              ])}
              onClick={() => router.push(`/projects/${projectId}/secrets`)}
            >
              Secrets
            </Sidebar.Item>
            <Sidebar.Item
              active={currentTab === "settings"}
              className={twJoin([
                "cursor-pointer font-semibold hover:bg-opacity-75 hover:text-slate-900",
                currentTab === "settings" ? "" : "text-slate-300",
              ])}
              onClick={() => router.push(`/projects/${projectId}/settings`)}
            >
              Settings
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <MobileNavigation currentTab={currentTab || ""} />
    </>
  );
};
