import { api } from "@/utils/api";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  projectId: string;
};

export const DeleteProject = ({ projectId }: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = api.projects.deleteProject.useMutation({
    onSuccess() {
      router.push("/dashboard");
    },
  });
  return (
    <>
      <Button
        color="danger"
        onClick={() => {
          setOpen(true);
        }}
      >
        Delete project
      </Button>
      <Modal isOpen={open} onOpenChange={() => setOpen(false)} backdrop="blur">
        <ModalContent>
          <ModalHeader>
            <div className="">Confirm your action</div>
          </ModalHeader>
          <ModalBody>
            <div className="">
              Are you sure you want to delete this project? This action is
              irreversible!
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex w-full justify-end gap-x-2">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                color="danger"
                isLoading={isLoading}
                disabled={isLoading}
                onClick={() => mutate({ projectId })}
              >
                Delete
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
