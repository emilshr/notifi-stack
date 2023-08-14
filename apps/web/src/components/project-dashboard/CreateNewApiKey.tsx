import { api } from "@/utils/api";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export const CreateNewApiKey = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const router = useRouter();
  const {
    query: { projectId },
  } = router;

  const { mutate, isLoading } = api.projects.createNewApiKey.useMutation({
    onSuccess() {
      setName("");
      setOpen(false);
      router.replace(router.asPath).then(() => {
        toast("Created a new API Key", { type: "success" });
      });
    },
  });

  return (
    <>
      <Button onClick={() => setOpen(true)} color="primary">
        Create new API Key
      </Button>
      <Modal isOpen={open} onOpenChange={() => setOpen(false)} backdrop="blur">
        <ModalContent>
          <ModalHeader>New API Key</ModalHeader>
          <ModalBody>
            <Input
              required
              onChange={(event) => {
                event.stopPropagation();
                setName(event.currentTarget.value);
              }}
              label="API Key identifier"
            />
          </ModalBody>
          <ModalFooter>
            <div className="flex w-full justify-end">
              <Button
                color="primary"
                onClick={() => {
                  mutate({ name, projectId: projectId as string });
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
    </>
  );
};
