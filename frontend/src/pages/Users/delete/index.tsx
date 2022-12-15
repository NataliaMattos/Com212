import React, { FormEvent, useState, useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { UserContext } from "../../../contexts/user";
import axios from "axios";

interface dateTable {
  name: string;
  id: string;
}

function DeleteModal({ name, id }: dateTable) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [conta, setConta] = useState("");
  const toast = useToast();

  const { refresh, setRefresh } = useContext(UserContext);

  const handleDelete = (event: FormEvent) => {
    event.preventDefault();

    try {
      axios.delete(`http://localhost:3000/user/${id}`).then(() => {
        toast({
          title: "Notícia Excluído",
          description: "Notícia excluída com sucesso.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose();
        setRefresh(!refresh);
      });
    } catch (error) {
      toast({
        title: "Erro desconhecido",
        description: "Verifique as informações e tente novamente",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        id="deleteUser"
        size="xs"
        variant="outline"
        onClick={() => {
          onOpen();
          setConta("");
        }}
      >
        <FiTrash2 />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color={useColorModeValue("gray.800", "white")}>
          <form onSubmit={handleDelete}>
            <ModalHeader color={useColorModeValue("green.500", "white")}>
              Deseja Excluir Usuário?
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <FormControl>
                <FormLabel>
                  Essa ação não pode ser desfeita, por favor digite{" "}
                  {
                    <Text display="inline" color="red" fontSize="md">
                      {name + " "}
                    </Text>
                  }
                  para confirmar.
                </FormLabel>
                <Input
                  id="nameDeleteUser"
                  borderColor="100"
                  value={conta}
                  onChange={(event) => {
                    setConta(event.target.value);
                  }}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                id="deleteSaveUser"
                disabled={conta !== name}
                colorScheme="green"
                mr={3}
                type="submit"
              >
                Excluir
              </Button>
              <Button onClick={onClose} colorScheme="red" id="cancelDeleteUser">
                Cancelar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteModal;
