import { ProjectSectionWrapper } from "../ProjectSectionWrapper";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { useState } from "react";
import { KeyRotationAlert } from "./KeyRotationAlert";
import { Button, Input } from "@nextui-org/react";

interface Props {
  secret: string;
}

export const AccessTokenSecretConfiguration = ({ secret }: Props) => {
  const router = useRouter();
  const { projectId } = router.query as { projectId: string };

  const [accessTokenSecret, setAccessTokenSecret] = useState(secret);
  const [open, setOpen] = useState(false);

  const { mutateAsync, isLoading } =
    api.projects.createNewAccessTokenSecret.useMutation({
      onSuccess(data) {
        setAccessTokenSecret(data.tokenSecret);
      },
    });

  return (
    <>
      <ProjectSectionWrapper
        sectionTitle="Access token secret"
        sectionDescription="This secret will be used to sign and authorize the temporary access token that the server issues"
      >
        <div className="flex gap-x-2">
          <div className="flex-1">
            <Input disabled value={accessTokenSecret} className="font-mono" />
          </div>
          <Button
            color="secondary"
            disabled={isLoading}
            onClick={() => {
              setOpen(true);
            }}
          >
            Randomize
          </Button>
        </div>
      </ProjectSectionWrapper>
      <KeyRotationAlert
        title="Warning! You are about to change your Access token secrets"
        open={open}
        description="Doing so would make the existing key invalid"
        buttonLabel="Randomize"
        onClose={() => setOpen(false)}
        onConfirm={async () => {
          await mutateAsync({ projectId });
        }}
        loading={isLoading}
      />
    </>
  );
};
