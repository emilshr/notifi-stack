import superjson from "superjson";
import type { PropsWithChildren } from "react";
import React, { useCallback, useEffect, useState } from "react";
import type { PackageRouter } from "@web/src/server/api/root";
import { loggerLink, httpBatchLink, createTRPCProxyClient } from "@trpc/client";

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
      const { message, colno, lineno, error } = ev;
      if (logErrors) {
        console.log(
          "[NOTIFI] Error detected: ",
          {
            message,
            colno,
            lineno,
            error,
          },
          error.stack
        );
      }
      const parsedError = new Error(error);

      trpcClient.package.writeErrorLog
        .mutate({
          error: {
            message: parsedError.message,
            stack: parsedError.stack,
          },
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
