import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  SimpleGrid,
  Spinner,
  Stack,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { v4 as uuid } from "uuid";
import { DemandContext } from "../../../../contexts/demand";


interface dateTable {
  filename: string;
  id: number;
  extension: string;
  category: string;
  path: string;
  user_id: string;
}

interface Order {
  fileName: string;
  category: string;
  user_id: string;
  file: string;
}

function CreateModal(data: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [id] = useState(data?.id);
  const [order, setOrder] = useState<Order>({
    fileName: data?.filename,
    category: data?.category,
    user_id: data?.user_id,
    file: data?.path,
  });

  const [isWaiting, setIsWaiting] = useState(false);
  const { setRefresh, refresh } = useContext(DemandContext);
  const toast = useToast();
  let unique_id = "";

  const handleSubmit = (event: FormEvent) => {
    setIsWaiting(true);
    unique_id = uuid();
    const userId = localStorage.getItem("UserId");
    event.preventDefault();
    axios
      .put(`order/${id}`, {
        fileId: unique_id,
        category: order.category,
        fileName: order.fileName,
        file: order.file,
        user_id: userId,
      })
      .then(() => {
        toast({
          title: "Usuário Atualizado.",
          description: "Usuário atualizado com sucesso.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setIsWaiting(false);
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
        setIsWaiting(false);
      });
  };

  const closeModal = () => {
    onClose();
  };


  function getBase64(file: any, cb: (result: any) => void) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
  }
  const saveInputFile = (value: any) => {
    getBase64(value[0], (result) => {
      setOrder({ ...order, file: result });
    });
  };

  const saveInputName = (value: any) => {
    setOrder({ ...order, fileName: value });
  };

  const saveInputCategory = (value: any) => {
    setOrder({ ...order, category: value });
  };

  return (
    <>
      <Button size="xs" variant="outline" onClick={onOpen}>
        <FiEdit />
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent color={useColorModeValue("gray.800", "white")}>
          <form onSubmit={handleSubmit} autoComplete="nope">
            <Flex flexDirection="column" w="100%" marginTop={10}>
              <Box margin="0 auto">
                  Upload
                <SimpleGrid width={"50vw"} mt={"10px"} mb={"40px"}>
                  <br></br>
                  <br></br>
                  <Box>
                    <FormControl isRequired>
                      <FormLabel as="legend">Categorias</FormLabel>
                      <RadioGroup
                        defaultValue="filme"
                        value={order.category}
                        onChange={(event) => {
                          saveInputCategory(event);
                        }}
                      >
                        <SimpleGrid minChildWidth={"160px"}>
                          <Radio value="movie">Filme</Radio>
                          <Radio value="animation">Animação</Radio>
                          <Radio value="desenho">Desenho</Radio>
                          <Radio value="logomarca">Logomarca</Radio>
                        </SimpleGrid>
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <br></br>
                  <br></br>
                  <Flex marginBottom={5} alignItems={"center"}>
                    <Box flex="1">
                      <FormControl isRequired>
                        <FormLabel htmlFor="name">Nome</FormLabel>
                        <Input
                          id="name"
                          max-length="300"
                          borderColor="darkgrey"
                          border="2px"
                          type="text"
                          value={order.fileName}
                          onChange={(event) => {
                            saveInputName(event?.target.value);
                          }}
                        />
                      </FormControl>
                    </Box>
                    <Box w={"fit-content"}>
                      <FormControl as="fieldset" isRequired>
                        <FormLabel as="legend">Arquivo</FormLabel>
                        <Input
                          multiple
                          type="file"
                          id="name"
                          max-length="300"
                          border="none"
                          onChange={(event) => {
                            saveInputFile(event?.target.files);
                          }}
                          accept="video/*,image/*,audio/*"
                        />
                      </FormControl>
                    </Box>
                  </Flex>
                  );
                </SimpleGrid>
                <Button colorScheme="green" mr={3} type="submit" value="submit">
                  {isWaiting ? (
                    <Spinner color="white.500" />
                  ) : (
                    <div> Salvar</div>
                  )}
                </Button>
                <Button colorScheme="red">Cancelar</Button>
              </Box>
            </Flex>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateModal;
