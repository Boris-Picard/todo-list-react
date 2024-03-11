import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useState } from "react";

export default function ModalUpdate({ onModifyTodo, id, defaultValue }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modifyTodoValue, setModifyTodoValue] = useState(defaultValue);

  const modifyTodo = (e) => {
    setModifyTodoValue(e.target.value);
  };

  const handleModifySubmit = (e) => {
    e.preventDefault();
    if (modifyTodoValue.trim()) {
      onModifyTodo(modifyTodoValue, id);
    }
  };
  return (
    <>
      <Button onPress={onOpen} color="warning">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
        </svg>
      </Button>
      <Modal
        isDismissable={false}
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        classNames={{
          body: "py-6",
          backdrop:
            "bg-gradient-to-br from-gray-900 to-gray-600/40 backdrop-opacity-40",
          base: "bg-gradient-to-br from-gray-900 to-gray-600",
          header: "border-b-[1px] border-gray-600",
          footer: "border-t-[1px] border-gray-600",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex text-center flex-col gap-1 font-bold text-white">
                Modifier
              </ModalHeader>
              <form onSubmit={handleModifySubmit}>
                <ModalBody>
                  <Input
                    className="focus:text-blue-600 caret-warning text-white"
                    color="warning"
                    id={id}
                    value={modifyTodoValue}
                    defaultValue={modifyTodoValue}
                    onChange={modifyTodo}
                    autoFocus
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="font-bold"
                    color="danger"
                    variant="ghost"
                    onPress={onClose}
                  >
                    Annuler
                  </Button>
                  <Button
                    className="font-bold"
                    type="submit"
                    color="warning"
                    onPress={onClose}
                    variant="ghost"
                  >
                    Valider
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
