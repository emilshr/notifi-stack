import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment, PropsWithChildren, useEffect } from "react";

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
  }, [status]);

  return <Fragment>{children}</Fragment>;
};
