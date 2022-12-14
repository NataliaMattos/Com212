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
import { Admin, AdminContext } from "../../../contexts/admin";

interface dateTable {
  create: (value: boolean) => void;
  adminEdit: Admin[];
  option: string;
}

function UpdateAdmin({ create, adminEdit, option }: dateTable) {
  const [id] = useState(option !== "create" ? adminEdit[0]?.id : "");
  const { setRefresh, refresh } = useContext(AdminContext);
  const [name, setName] = useState(
    option === "create" ? "" : adminEdit[0]?.name
  );
  const [lastname, setlastname] = useState(
    option === "create" ? "" : adminEdit[0]?.lastname
  );
  const [email, setEmail] = useState(
    option === "create" ? "" : adminEdit[0]?.email
  );
  const [password, setPassword] = useState(
    option === "create" ? "" : adminEdit[0]?.password
  );
  const [branch, setBranch] = useState(
    option === "create" ? "" : adminEdit[0]?.branch
  );
  const [department, setDepartment] = useState(
    option === "create" ? "" : adminEdit[0]?.department
  );

  const toast = useToast();

  const handleSubmit = (event: FormEvent) => {
    const unique_id = uuid();
    if (option === "create") {
      event.preventDefault();
      axios
        .post("http://localhost:3000/admin", {
          id: unique_id,
          name: name,
          lastname: lastname,
          email: email,
          password: password,
          branch: branch,
          department: department,
        })
        .then(() => {
          toast({
            title: "Admin Cadastrado.",
            description: "Admin Cadastrado com sucesso.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          closePage();
          setRefresh(!refresh);
        })
        .catch(() => {
          toast({
            title: "Erro desconhecido",
            description: "Verifique as informa????es e tente novamente",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          setRefresh(!refresh);
        });
    } else if (option === "update") {
      axios
        .patch(`http://localhost:3000/admin/${id}`, {
          name: name,
          lastname: lastname,
          email: email,
          password: password,
          branch: branch,
          department: department,
        })
        .then(() => {
          toast({
            title: "Admin Atualizado.",
            description: "Admin Atualizado com sucesso.",
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
                Criar Admin
              </Text>
            ) : (
              <Text fontSize="3xl" fontWeight={"bold"} mb={"30px"}>
                Editar Admin
              </Text>
            )}
            <Text fontSize="2xl">Dados da Admin</Text>
            <SimpleGrid
              minChildWidth={"48%"}
              spacing="20px"
              mt={"10px"}
              mb={"40px"}
            >
              <FormControl isRequired>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <Input
                  id="nameAdmin"
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
                  id="lastNameAdmin"
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
                  id="emailAdmin"
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
                  id="passwordAdmin"
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
                  id="branchAdmin"
                  max-length="300"
                  borderColor="darkgrey"
                  border="2px"
                  type="text"
                  value={branch}
                  onChange={(event) => {
                    setBranch(event?.target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="name">Departamento</FormLabel>
                <Input
                  id="departamentAdmin"
                  max-length="300"
                  borderColor="darkgrey"
                  border="2px"
                  type="text"
                  value={department}
                  onChange={(event) => {
                    setDepartment(event?.target.value);
                  }}
                />
              </FormControl>
            </SimpleGrid>

            <br></br>
            <br></br>
            <Button colorScheme="green" mr={3} type="submit" value="submit" id="SaveAdmin">
              Salvar
            </Button>
            <Button onClick={closePage} colorScheme="red" id="CancelSaveAdmin">
              Cancelar
            </Button>
          </Box>
        </Flex>
      </form>
    </>
  );
}
export default UpdateAdmin;
