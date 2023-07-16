"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "./trpc-client";
import superJson from "superjson";
import { NotifiWrapper } from "@emilshr/notifi";

export const AppContextProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
        }),
      ],
      transformer: superJson,
    })
  );
  return (
    <SessionProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <NotifiWrapper>{children}</NotifiWrapper>
        </QueryClientProvider>
      </trpc.Provider>
    </SessionProvider>
  );
};