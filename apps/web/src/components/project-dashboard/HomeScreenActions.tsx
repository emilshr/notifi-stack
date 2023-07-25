import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const HomeScreenActions = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    return (
      <button
        className="rounded-full bg-slate-700 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={(event) => {
          event.stopPropagation();
          router.push("/dashboard");
        }}
      >
        Take me to my dashboard
      </button>
    );
  }

  return (
    <button
      className="rounded-full bg-slate-700 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      onClick={(event) => {
        event.stopPropagation();
        signIn("github", { callbackUrl: "/dashboard" });
      }}
    >
      Sign in
    </button>
  );
};
