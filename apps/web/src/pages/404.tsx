import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function Page() {
  const { status } = useSession();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-4">
      <div className="flex items-center gap-x-2 text-2xl font-bold">
        Much empty! Looks like you&apos;re lost
        <div className="text-5xl">🤔</div>
      </div>
      <div>
        {status === "authenticated" ? (
          <Button color="secondary">Go back to dashboard</Button>
        ) : (
          <Button color="secondary">Go home</Button>
        )}
      </div>
    </div>
  );
}
