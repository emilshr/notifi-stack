import superjson from "superjson";
import type { PropsWithChildren } from "react";
import React, { useCallback, useEffect, useState } from "react";
import type { PackageRouter } from "@web/src/server/api/root";
import { loggerLink, httpBatchLink, createTRPCProxyClient } from "@trpc/client";

export type NotifiWrapperProps = {
  /**
   * @type {string}
   * @description The API key generated from the project. The value can be copied from the API Keys tab on the project dashboard
   */
  projectApiKey: string;
  /**
   * @type {string}
   * @description The public ID of the project. The value can be copied from the API Keys tab on the project dashboard
   */
  projectId: string;
  /**
   * @type {string}
   * @description The domain where the next app is hosted. For example, if the Notifi dashboard is hosted at `https://www.notifi.site`, then pass in the connection Endpoint as `https://www.notifi.site` itself.
   * @note The API endpoints for the package to work would be hosted under `https://<whichever domain>/api/packageTrpc/`. However you wouldn't need to pass the `/api/packageTrpc` part of the URL
   * @optional
   * @note "https://www.notifi.site" by default
   */
  connectionEndpoint?: string;
  /**
   * @type {string}
   * @description A flag to silently print errors on the console
   * @optional
   * @note true by default
   */
  logErrors?: boolean;
};

/**
 *
 * @description A wrapper component for your React component tree that will register couple of listeners on the DOM which would collect and report unhandled errors & runtime exceptions that occurs in your web app.
 */
export const NotifiWrapper = ({
  children,
  connectionEndpoint = "https://www.notifi.site",
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
    if (window.location.hostname.toLowerCase() !== "localhost") {
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
    }
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
