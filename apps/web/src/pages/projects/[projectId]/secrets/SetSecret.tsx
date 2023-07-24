import { TextField } from "@/components";
import { Button } from "flowbite-react";
import { useRouter } from "next/router";

export const SetSecret = () => {
  const router = useRouter();
  const { projectId } = router.query;

  return (
    <div className="flex w-full gap-x-2">
      <div className="flex-1">
        <TextField type="password" />
      </div>
      <Button color="gray">Update secret</Button>
      <Button color="success">Randomize</Button>
    </div>
  );
};
