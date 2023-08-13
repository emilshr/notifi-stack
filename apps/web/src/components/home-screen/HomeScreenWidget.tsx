import { DocsIcon } from "@/svg-icons/docs-icon";
import { Button, Snippet } from "@nextui-org/react";
import { useRouter } from "next/router";

export const HomeScreenWidget = () => {
  const router = useRouter();
  return (
    <div className="flex h-full flex-col justify-center gap-y-24 px-0 lg:px-10 xl:px-40">
      <div className="flex flex-col items-center gap-y-8">
        <div className="xs:text-xl text-center text-3xl font-black tracking-[0.01rem] text-gray-700 dark:text-gray-200 sm:text-4xl md:text-6xl">
          Error reporting made easy
        </div>
        <div className="gap-y-1 text-center text-base text-gray-500 sm:px-10 sm:text-lg md:text-xl xl:px-40">
          Monitoring your app crashes just became super simple. View in-depth
          stack trace of the last prod killing bug
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-4">
        <div className="flex gap-x-4">
          <Button
            size="lg"
            color="primary"
            radius="sm"
            style={{
              fontWeight: 600,
            }}
            onClick={() => router.push("/dashboard")}
          >
            Get started
          </Button>
          <a href="https://www.docs.notifi.com" target="_blank">
            <Button
              size="lg"
              color="default"
              radius="sm"
              style={{
                fontWeight: 600,
              }}
              endContent={<DocsIcon />}
            >
              Docs
            </Button>
          </a>
        </div>
        <div className="flex w-full items-center justify-center">
          <Snippet>npm install @emilshr/notifi</Snippet>
        </div>
      </div>
    </div>
  );
};
