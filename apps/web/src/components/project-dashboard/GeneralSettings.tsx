import { useState } from "react";
import { api } from "@/utils/api";
import type { Project } from "@prisma/client";
import { DeleteProject } from "./DeleteProject";
import { ProjectSectionWrapper } from "@/components/ProjectSectionWrapper";
import { toast } from "react-toastify";
import { Button, Input, Textarea } from "@nextui-org/react";

type Props = {
  project: Project;
};

export const GeneralSettings = ({ project }: Props) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const { isLoading, mutate } = api.projects.updateProject.useMutation({
    onSuccess({ name, description }) {
      setName(name);
      setDescription(description);
      console.log("success");
      toast.success("Updated project details", { toastId: "project_update" });
    },
  });

  return (
    <>
      <ProjectSectionWrapper
        sectionTitle="General settings"
        sectionDescription="Change your project name and description"
      >
        <Input
          label="Project name"
          required
          type="text"
          className="bg-transparent"
          value={name}
          onChange={(event) => {
            event.stopPropagation();
            setName(event.currentTarget.value);
          }}
        />
        <Textarea
          label="Project description"
          value={description}
          minRows={4}
          aria-multiline
          onChange={(event) => {
            event.stopPropagation();
            setDescription(event.currentTarget.value);
          }}
        />
        <div className="flex justify-end">
          <Button
            color="secondary"
            disabled={
              isLoading ||
              (project.name === name && project.description === description)
            }
            isLoading={isLoading}
            onClick={() => {
              mutate({ name, description, projectId: project.id });
            }}
          >
            Update
          </Button>
        </div>
      </ProjectSectionWrapper>
      <ProjectSectionWrapper
        sectionTitle="Danger zone"
        sectionDescription="The following actions are destructive and cannot be reversed"
      >
        <div className="flex justify-end">
          <DeleteProject projectId={project.id} />
        </div>
      </ProjectSectionWrapper>
    </>
  );
};
