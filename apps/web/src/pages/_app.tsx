import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { NotifiWrapper } from "@emilshr/notifi";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NotifiWrapper>
        <Component {...pageProps} />
      </NotifiWrapper>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
