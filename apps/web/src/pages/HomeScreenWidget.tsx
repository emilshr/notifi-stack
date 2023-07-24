import { HomeScreenActions } from "./HomeScreenActions";

export const HomeScreenWidget = () => {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="group relative">
        <div className="group-hover:duration:200 animate-tilt absolute -inset-1 rounded-md bg-pink-600 bg-gradient-to-r from-pink-600 to-purple-600 opacity-75 blur transition duration-1000 group-hover:opacity-100" />
        <div className="relative rounded-lg bg-slate-950 px-10 py-16 md:px-16 md:py-24">
          <div className="flex  flex-col items-center justify-center gap-y-4 md:gap-y-12">
            <div className="flex flex-col items-center gap-y-2 md:gap-y-4">
              <h1 className="text-6xl font-black md:text-9xl">Notifi.</h1>
              <span className="text-xs md:text-xl">
                Control your notifications with{" "}
                <div className="rounded-sm bg-slate-200 bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-center text-lg font-extrabold text-transparent md:inline-block   md:text-2xl">
                  ease
                </div>
              </span>
            </div>
            <HomeScreenActions />
          </div>
        </div>
      </div>
    </div>
  );
};
