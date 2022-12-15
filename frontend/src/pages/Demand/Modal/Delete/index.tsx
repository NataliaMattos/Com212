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
import { UserContext } from "../../../../contexts/user";
import axios from "axios";
import { DemandContext } from "../../../../contexts/demand";
interface dateTable {
  user: string;
  id: number;
}

function DeleteModal({ user, id }: dateTable) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [conta, setConta] = useState("");
  const toast = useToast();

  const { setRefresh, refresh } = useContext(DemandContext);

  const handleDelete = (event: FormEvent) => {
    event.preventDefault();

    axios
      .delete(`http://localhost:3000/order/${id}`)
      .then(() => {
        toast({
          title: "Demanda Excluído",
          description: "Demanda excluído com sucesso.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose();
        setRefresh(!refresh);
      })
      .catch(() => {
        toast({
          title: "Erro desconhecido",
          description: "Verifique as informações e tente novamente",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Button
        size="xs"
        variant="outline"
        onClick={() => {
          onOpen();
          setConta("");
        }}
        id="deleteDemand"
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
                      {user + " "}
                    </Text>
                  }
                  para confirmar.
                </FormLabel>
                <Input
                  id="nameDeleteDemand"
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
                id="deleteSaveDemand"
                disabled={conta !== user}
                colorScheme="green"
                mr={3}
                type="submit"
              >
                Excluir
              </Button>
              <Button onClick={onClose} colorScheme="red" id="cancelarDeleteDemand">
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
