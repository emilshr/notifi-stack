import { api } from "@/utils/api";
import { Button, Modal, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export const CreateNewSecret = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const router = useRouter();
  const {
    query: { projectId },
  } = router;

  const { mutate, isLoading } = api.projects.createNewSecret.useMutation({
    onSuccess() {
      setName("");
      setOpen(false);
      router.replace(router.asPath).then(() => {
        toast("Created a new secret", { type: "success" });
      });
    },
  });

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create new secret</Button>
      <Modal show={open} onClose={() => setOpen(false)}>
        <Modal.Header>New Secret</Modal.Header>
        <Modal.Body>
          <TextInput
            placeholder="Secret name"
            required
            onChange={(event) => {
              event.stopPropagation();
              setName(event.currentTarget.value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full justify-end">
            <Button
              color="dark"
              onClick={() => {
                mutate({ name, projectId: projectId as string });
              }}
              disabled={name === ""}
              isProcessing={isLoading}
            >
              Create
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
