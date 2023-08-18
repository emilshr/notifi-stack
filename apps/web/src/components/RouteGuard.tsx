import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment, type PropsWithChildren, useEffect } from "react";
import { CheckAuthDialog } from "./check-auth/CheckAuthDialog";

const publicPaths = ["/", "/login", "/about"];

export const RouteGuard = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { status } = useSession();
  const { pathname } = router;

  useEffect(() => {
    if (!publicPaths.includes(pathname)) {
      if (status === "unauthenticated") {
        router.push("/");
      }
    }
  }, [status, pathname, router]);

  return (
    <Fragment>
      <CheckAuthDialog />
      {children}
    </Fragment>
  );
};
