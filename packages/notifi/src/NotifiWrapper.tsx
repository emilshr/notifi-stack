import { PropsWithChildren, useEffect } from "react";

export const NotifiWrapper = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    console.log("Notifi wrapper init");
  }, []);
  return <>{children}</>;
};
