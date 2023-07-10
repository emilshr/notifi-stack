import { Button, Header } from "ui";
import { appRouter } from "../server/trpc-server";

export default async function Page() {
  const caller = appRouter.createCaller({});
  const result = await caller.userById(1);
  console.log({ result });
  return (
    <>
      <Header text="Web" />
      <Button />
    </>
  );
}
