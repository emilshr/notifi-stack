import { TextField } from "@/components";
import { generateProjectSecret } from "@/services/sign-hash.service";
import { api } from "@/utils/api";
import { Alert, Button } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type ShowIconProps = {
  onClick: () => void;
  show: boolean;
};

const ShowIcon = ({ onClick, show }: ShowIconProps) => {
  return (
    <Button color={show ? "gray" : "dark"} onClick={() => onClick()}>
      {show ? "Hide" : "Show"}
    </Button>
  );
};

export const SetSecret = () => {
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const { projectId = "" } = router.query;
  const { data } = api.projects.getCurrentSecret.useQuery({
    projectId: projectId as string,
  });

  const [updatedSecret, setUpdatedSecret] = useState(data ?? "");

  useEffect(() => {
    if (data) {
      setUpdatedSecret(data);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex w-full gap-x-2">
        <div className="flex flex-1 gap-x-1">
          <ShowIcon onClick={() => setShow(!show)} show={show} />
          <div className="flex-1">
            <TextField
              type={show ? "text" : "password"}
              value={updatedSecret}
            />
          </div>
        </div>
        <Button color="gray">Update secret</Button>
        <Button
          color="success"
          onClick={() => {
            setUpdatedSecret(generateProjectSecret());
            setShow(true);
            setShowAlert(true);
          }}
        >
          Randomize
        </Button>
      </div>
      {showAlert && (
        <Alert color="warning" onDismiss={() => setShowAlert(false)}>
          Click on update secret to save the new randomized secret
        </Alert>
      )}
    </div>
  );
};
