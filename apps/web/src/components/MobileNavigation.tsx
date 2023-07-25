import { Button } from "flowbite-react";
import { useRouter } from "next/router";

type Props = {
  currentTab: string;
};

export const MobileNavigation = ({ currentTab }: Props) => {
  const router = useRouter();
  const { projectId } = router.query as { projectId: string };
  return (
    <div className="flex w-full justify-center pb-4 lg:hidden">
      <Button.Group>
        <Button
          color={currentTab === "[projectId]" ? "gray" : "dark"}
          onClick={() => router.push(`/projects/${projectId}`)}
        >
          Overview
        </Button>
        <Button
          color={currentTab === "secrets" ? "gray" : "dark"}
          onClick={() => router.push(`/projects/${projectId}/secrets`)}
        >
          API Keys
        </Button>
        <Button
          color={currentTab === "settings" ? "gray" : "dark"}
          onClick={() => router.push(`/projects/${projectId}/settings`)}
        >
          Settings
        </Button>
      </Button.Group>
    </div>
  );
};
