import React, { useCallback, useEffect, useState } from "react";
import { loggerLink, httpBatchLink, createTRPCProxyClient } from "@trpc/client";
import type { PropsWithChildren } from "react";
import type { PackageRouter } from "@web/src/server/api/root";
import superjson from "superjson";

export type NotifiWrapperProps = {
  projectApiKey: string;
  projectId: string;
  connectionEndpoint: string;
  logErrors?: boolean;
};

export const NotifiWrapper = ({
  children,
  connectionEndpoint,
  projectApiKey,
  projectId,
  logErrors = true,
}: PropsWithChildren<NotifiWrapperProps>) => {
  const [trpcClient] = useState(() =>
    createTRPCProxyClient<PackageRouter>({
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${connectionEndpoint}/api/packageTrpc`,
          headers() {
            return {
              "x-api-key": projectApiKey,
              "project-id": projectId,
            };
          },
        }),
      ],
      transformer: superjson,
    })
  );

  const registerErrorListeners = useCallback(() => {
    window.addEventListener("error", (ev) => {
      const { message, error, colno, lineno } = ev;
      trpcClient.package.writeErrorLog
        .mutate({
          error: { message },
          colNo: colno,
          lineNo: lineno,
        })
        .then((data) => {
          console.log({ data });
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    registerErrorListeners();
  }, [registerErrorListeners]);

  return <NotifiChildren>{children}</NotifiChildren>;
};

const NotifiChildren = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};
