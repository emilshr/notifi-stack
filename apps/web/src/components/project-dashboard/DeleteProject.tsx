import { api } from "@/utils/api";
import { Button, Modal } from "flowbite-react";
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
        color="failure"
        onClick={() => {
          setOpen(true);
        }}
      >
        Delete project
      </Button>
      <Modal show={open} onClose={() => setOpen(false)}>
        <Modal.Header>
          <div className="">Confirm your action</div>
        </Modal.Header>
        <Modal.Body>
          <div className="text-slate-700">
            Are you sure you want to delete this project? This action is
            irreversible!
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full justify-end gap-x-2">
            <Button color="gray" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              color="failure"
              isProcessing={isLoading}
              disabled={isLoading}
              onClick={() => mutate({ projectId })}
            >
              Delete
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
