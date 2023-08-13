import { useState } from "react";
import { api } from "@/utils/api";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";

export const CreateNewProject = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { projects } = api.useContext();

  const { mutate, isLoading } = api.projects.createProject.useMutation({
    onSuccess() {
      setOpen(false);
      projects.getProjects.invalidate();
    },
  });

  return (
    <>
      <div className="flex w-full justify-between">
        <h1 className="text-4xl font-bold">Your projects</h1>
        <Button onClick={() => setOpen(true)}>Create new project</Button>

        <Modal
          isOpen={open}
          onOpenChange={() => setOpen(false)}
          placement="center"
          backdrop="blur"
        >
          <ModalContent>
            <ModalHeader>New project</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-y-4">
                <Input
                  label="Project name"
                  required
                  onChange={(event) => {
                    event.stopPropagation();
                    setName(event.currentTarget.value);
                  }}
                />
                <Textarea
                  label="Description of the project"
                  onChange={(event) => {
                    event.stopPropagation();
                    setDescription(event.currentTarget.value);
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex w-full justify-end">
                <Button
                  onClick={() => {
                    mutate({ projectName: name, description });
                  }}
                  disabled={name === ""}
                  isLoading={isLoading}
                >
                  Create
                </Button>
              </div>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};
