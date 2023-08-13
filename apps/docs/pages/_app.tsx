import { Connection, ApplicationCrashWatcher } from "@emilshr/notifi";
import { AppType } from "next/app";

const crashWatcher = new ApplicationCrashWatcher();

crashWatcher.main();

const MyApp: AppType = ({ Component, pageProps }) => {
  console.log("Root");
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
