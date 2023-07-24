import Link from "next/link";

export const GetStartedAlert = () => {
  return (
    <Link href="/docs" target="_blank">
      <div className="group rounded-md border-[1px] border-slate-700 p-4 hover:bg-gradient-to-t hover:from-slate-900 hover:to-transparent">
        <div className="flex flex-col gap-y-4">
          <span className="text-2xl font-semibold">Let's get started</span>
          <span className="text-sm text-slate-600 underline group-hover:text-slate-400">
            Take me to docs
          </span>
        </div>
      </div>
    </Link>
  );
};
