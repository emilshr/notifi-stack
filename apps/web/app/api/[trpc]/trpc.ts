import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { appRouter, createTRPCContext } from "../../../server/trpc-server";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: function (opts: FetchCreateContextFnOptions) {
      return createTRPCContext({
        req: opts.req as unknown as NextApiRequest,
        res: opts.resHeaders as unknown as NextApiResponse,
      });
    },
  });
};

export const GET = handler;
export const POST = handler;
