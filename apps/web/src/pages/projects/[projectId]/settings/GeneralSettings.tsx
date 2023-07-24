import { Button, TextInput } from "flowbite-react";
import { ProjectSectionWrapper } from "../../ProjectSectionWrapper";
import { TextArea, TextField } from "@/components";
import { useState } from "react";
import { api } from "@/utils/api";
import { Project } from "@prisma/client";

type Props = {
  project: Project;
};

export const GeneralSettings = ({ project }: Props) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const { isLoading, mutate } = api.projects.updateProject.useMutation({
    onSuccess({ name, description }) {
      console.log("setting data");
      setName(name);
      setDescription(description);
    },
  });

  return (
    <>
      <ProjectSectionWrapper
        sectionTitle="General settings"
        sectionDescription="Change your project name and description"
      >
        <TextField
          placeholder="Your project name"
          required
          shadow
          type="text"
          className="bg-transparent"
          value={name}
          onChange={(event) => {
            event.stopPropagation();
            setName(event.currentTarget.value);
          }}
        />
        <TextArea
          placeholder="Description about your project"
          value={description}
          aria-multiline
          rows={5}
          onChange={(event) => {
            event.stopPropagation();
            setDescription(event.currentTarget.value);
          }}
        />
        <div className="flex justify-end">
          <Button
            disabled={
              isLoading ||
              (project.name === name && project.description === description)
            }
            isProcessing={isLoading}
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
          <Button color="failure">Delete project</Button>
        </div>
      </ProjectSectionWrapper>
    </>
  );
};
