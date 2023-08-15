import { useState } from "react";
import { Button } from "@nextui-org/react";
import dynamic from "next/dynamic";

const ProjectModal = dynamic(() => import('./CreateNewProjectModal'));


export const CreateNewProject = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex w-full justify-between">
        <h1 className="text-4xl font-bold">Your projects</h1>
        <Button onClick={() => setOpen(true)}>Create new project</Button>
        <ProjectModal onClose={() => setOpen(false)} open={open} />
      </div>
    </>
  );
};
