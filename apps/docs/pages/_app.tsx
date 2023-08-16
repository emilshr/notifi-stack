import { NotifiWrapper } from "@emilshr/notifi";
import { AppType } from "next/app";

import { env } from "../env.mjs";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <NotifiWrapper
      projectApiKey={env.NEXT_PUBLIC_PROJECT_API_KEY}
      projectId={env.NEXT_PUBLIC_PROJECT_ID}
      connectionEndpoint={env.NEXT_PUBLIC_CONNECTION_ENDPOINT}
    >
      <Component {...pageProps} />
    </NotifiWrapper>
  );
};

export default MyApp;
