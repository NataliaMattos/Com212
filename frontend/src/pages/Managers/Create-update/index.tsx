import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { Manager, ManagerContext } from "../../../contexts/manager";

interface dateTable {
  create: (value: boolean) => void;
  managerEdit: Manager[];
  option: string;
}

function UpdateManager({ create, managerEdit, option }: dateTable) {
  const [id] = useState(option !== "create" ? managerEdit[0]?.id : "");
  const { setRefresh, refresh } = useContext(ManagerContext);
  const [name, setName] = useState(
    option === "create" ? "" : managerEdit[0]?.name
  );
  const [lastname, setlastname] = useState(
    option === "create" ? "" : managerEdit[0]?.lastname
  );
  const [email, setEmail] = useState(
    option === "create" ? "" : managerEdit[0]?.email
  );
  const [password, setPassword] = useState(
    option === "create" ? "" : managerEdit[0]?.password
  );
  const [branch, setBranch] = useState(
    option === "create" ? "" : managerEdit[0]?.branch
  );

  const toast = useToast();

  const handleSubmit = (event: FormEvent) => {
    const unique_id = uuid();
    if (option === "create") {
      event.preventDefault();
      axios
        .post("http://localhost:3000/manager", {
          id: unique_id,
          name: name,
          lastname: lastname,
          email: email,
          password: password,
          branch: branch,
        })
        .then(() => {
          toast({
            title: "Gerente Cadastrado.",
            description: "Gerente Cadastrado com sucesso.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          closePage();
          // setRefresh(!refresh);
        })
        .catch(() => {
          toast({
            title: "Erro desconhecido",
            description: "Verifique as informações e tente novamente",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          // setRefresh(!refresh);
        });
    } else if (option === "update") {
      axios
        .patch(`http://localhost:3000/manager/${id}`, {
          name: name,
          lastname: lastname,
          email: email,
          password: password,
          branch: branch,
        })
        .then(() => {
          toast({
            title: "Gerente Atualizado.",
            description: "Gerente Atualizado com sucesso.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        });
    }
  };

  const closePage = () => {
    create(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="nope">
        <Flex justifyContent={"center"}>
          <Box width={"100%"} maxWidth={"1200px"}>
            {option === "create" ? (
              <Text fontSize="3xl" fontWeight={"bold"} mb={"30px"}>
                Criar Conta
              </Text>
            ) : (
              <Text fontSize="3xl" fontWeight={"bold"} mb={"30px"}>
                Editar Conta
              </Text>
            )}
            <Text fontSize="2xl">Dados da Conta</Text>
            <SimpleGrid
              minChildWidth={"48%"}
              spacing="20px"
              mt={"10px"}
              mb={"40px"}
            >
              <FormControl isRequired>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <Input
                  id="nameManager"
                  max-length="300"
                  borderColor="darkgrey"
                  border="2px"
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event?.target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="lastname">Ultimo Nome</FormLabel>
                <Input
                  id="lastnameManager"
                  max-length="300"
                  borderColor="darkgrey"
                  border="2px"
                  type="text"
                  value={lastname}
                  onChange={(event) => {
                    setlastname(event?.target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="emailManager"
                  max-length="300"
                  borderColor="darkgrey"
                  border="2px"
                  type="text"
                  value={email}
                  onChange={(event) => {
                    setEmail(event?.target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="name">Senha</FormLabel>
                <Input
                  id="passwordManager"
                  max-length="300"
                  borderColor="darkgrey"
                  border="2px"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event?.target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="name">Filial</FormLabel>
                <Input
                  id="branchManager"
                  max-length="300"
                  borderColor="darkgrey"
                  border="2px"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setBranch(event?.target.value);
                  }}
                />
              </FormControl>
            </SimpleGrid>

            <br></br>
            <br></br>
            <Button colorScheme="green" mr={3} type="submit" value="submit" id="saveManager">
              Salvar
            </Button>
            <Button onClick={closePage} colorScheme="red"  id="cancelSaveDemand">
              Cancelar
            </Button>
          </Box>
        </Flex>
      </form>
    </>
  );
}
export default UpdateManager;
