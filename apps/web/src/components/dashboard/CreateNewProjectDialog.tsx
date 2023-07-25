import { useState } from "react";
import { Button, Modal, TextInput, Textarea } from "flowbite-react";
import { api } from "@/utils/api";

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
        <Button color="dark" onClick={() => setOpen(true)}>
          Create new project
        </Button>

        <Modal show={open} onClose={() => setOpen(false)} position="center">
          <Modal.Header>New project</Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-y-4">
              <TextInput
                placeholder="Project name"
                required
                onChange={(event) => {
                  event.stopPropagation();
                  setName(event.currentTarget.value);
                }}
              />
              <Textarea
                placeholder="Description of the project"
                onChange={(event) => {
                  event.stopPropagation();
                  setDescription(event.currentTarget.value);
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex w-full justify-end">
              <Button
                color="dark"
                onClick={() => {
                  mutate({ projectName: name, description });
                }}
                disabled={name === ""}
                isProcessing={isLoading}
              >
                Create
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
