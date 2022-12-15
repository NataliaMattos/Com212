import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";

interface OrderInterface {
  fileName: string;
  category: string;
  file: string;
}

function Order() {
  const [order, setOrder] = useState<OrderInterface>({
    fileName: "",
    category: "",
    file: "",
  });
  const [isWaiting, setIsWaiting] = useState(false);

  const toast = useToast();

  const handleSubmit = (event: FormEvent) => {
    const userType = localStorage.getItem("userType");
    setIsWaiting(true);
    event.preventDefault();
    axios
      .post("http://localhost:3000/order", {
        fileId: uuid(),
        category: order.category,
        fileName: order.fileName,
        file: order.file,
        user_id: userType,
      })
      .then(() => {
        toast({
          title: "Upload feito com sucesso.",
          description: "Upload feita com sucesso.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Erro desconhecido",
          description: "Verifique as informações e tente novamente",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsWaiting(false);
      });
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
    <Text fontSize="3xl" fontWeight={"bold"} w="100%" ml={5} mt={5}>Criar Demandas</Text>
      <form onSubmit={handleSubmit} autoComplete="nope">
        <Flex flexDirection="column" w="100%" marginTop={10}>
          <Box margin="0 auto">
            <Text fontSize="3xl" fontWeight={"bold"} mb={"30px"}>
              Upload
            </Text>
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
            </SimpleGrid>
            <Button colorScheme="green" mr={3} type="submit" value="submit">
              {isWaiting ? <Spinner color="white.500" /> : <div> Salvar</div>}
            </Button>
            <Button colorScheme="red">Cancelar</Button>
          </Box>
        </Flex>
      </form>
    </>
  );
}
export default Order;
