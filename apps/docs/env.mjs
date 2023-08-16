import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {},
  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
  */
 client: {
   NEXT_PUBLIC_CONNECTION_ENDPOINT: z.string().url(),
   NEXT_PUBLIC_PROJECT_API_KEY: z.string(),
   NEXT_PUBLIC_PROJECT_ID: z.string(),
  },
  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NEXT_PUBLIC_CONNECTION_ENDPOINT: process.env.NEXT_PUBLIC_CONNECTION_ENDPOINT,
    NEXT_PUBLIC_PROJECT_API_KEY: process.env.NEXT_PUBLIC_PROJECT_API_KEY,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID
  },
});
