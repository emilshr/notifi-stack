import "@/styles/globals.css";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import { NotifiWrapper } from "@emilshr/notifi";
import { CustomNavbar } from "@/components/Navbar";

import { Inter } from "next/font/google";
import { RouteGuard } from "@/components/RouteGuard";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main>
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
        <RouteGuard>
          <NotifiWrapper>
            <div className="flex h-screen flex-col">
              <CustomNavbar />
              <div className="flex h-full w-full px-4 pt-4">
                <Component {...pageProps} />
              </div>
            </div>
          </NotifiWrapper>
        </RouteGuard>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
