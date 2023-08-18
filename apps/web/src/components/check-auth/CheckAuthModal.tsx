import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const CheckAuthModal = ({ onClose, open }: Props) => {
  return (
    <Modal isOpen={open} onClose={onClose} hideCloseButton backdrop="blur">
      <ModalContent>
        <ModalHeader className="flex w-full justify-center">
          Checking for login status
        </ModalHeader>
        <ModalBody className="pb-4">
          <Spinner />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CheckAuthModal;
