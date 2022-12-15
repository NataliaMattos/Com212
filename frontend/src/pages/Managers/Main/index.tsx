import {
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { Manager, ManagerContext, Managers } from "../../../contexts/manager";
import DeleteModal from "../delete";
interface MainManagersProps {
  create: (value: boolean) => void;
  ManagerEdit: (value: Manager[]) => void;
  setOption: (value: string) => void;
}

const MainManagers: React.FC<MainManagersProps> = ({
  create,
  ManagerEdit,
  setOption,
}: MainManagersProps): React.ReactElement => {
  const { managers, isLoading } = useContext(ManagerContext);

  const [Manager, setManager] = useState<Managers[]>([]);
  const [createManagers, setCreateManagers] = useState(false);
  const [conta, setConta] = useState<Manager>();
  const [userType, setUserType] = useState<any>();
  const [newOperation, setnewOperation] = useState<string>("");

  useEffect(() => {
    setManager(managers);
  }, [managers]);

  useEffect(() => {
    create(createManagers);
  }, [create, createManagers]);

  useEffect(() => {
    return ManagerEdit(conta ? [conta] : []);
  }, [ManagerEdit, conta]);

  useEffect(() => {
    setOption(newOperation);
  }, [setOption, newOperation]);

  useEffect(() => {
    setUserType(localStorage.getItem("userType"));
  }, []);

  return (
    <>
      {<Heading mb={3}>Lista de Gerentes</Heading>}
      <Flex flexDirection="column" w="100%" marginTop={10}>
        <Flex mb="20px" display="flex" alignItems="center">
          <Spacer />
          <Box>
            {(isLoading) && userType === "admin" ? (
              <Button
                leftIcon={<IoIosAdd />}
                colorScheme="green"
                variant="solid"
                onClick={() => {
                  setCreateManagers(true);
                  setnewOperation("create");
                }}
              >
                Adicionar
              </Button>
            ) : userType === "admin" ? (
              <Button
                leftIcon={<IoIosAdd />}
                colorScheme="green"
                variant="solid"
                isDisabled={true}
                id="createManager"
              >
                Adicionar
              </Button>
            ) : (
              ""
            )}
          </Box>
        </Flex>
        {isLoading ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Sobrenome</Th>
                <Th>Email</Th>
                <Th>Senha</Th>
                <Th>Filial</Th>
                {userType === "admin" ? (
                  <Th>Ações</Th>
                ) : (
                  ""
                )}
              </Tr>
            </Thead>
            <Tbody>
              {managers.map((elem: Managers, i: number) => {
                return (
                  <Tr key={i}>
                    <Td>{elem.name}</Td>
                    <Td>{elem.lastname}</Td>
                    <Td>{elem.email}</Td>
                    <Td>{elem.password}</Td>
                    <Td>{elem.branch}</Td>
                    {userType === "admin" ? (
                      <Td>
                        <Box display="flex" justifyContent="space-evenly">
                          <Button
                            id="editManager"
                            size="xs"
                            variant="outline"
                            onClick={() => {
                              setCreateManagers(true);
                              setnewOperation("update");
                              setConta(elem);
                            }}
                          >
                            <FiEdit />
                          </Button>
                          <DeleteModal name={elem.name} id={elem.id} />
                        </Box>
                      </Td>
                    ) : (
                      ""
                    )}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        ) : (
          <Stack mt="50px">
            <Skeleton height="57px" />
            <Skeleton height="57px" />
            <Skeleton height="57px" />
            <Skeleton height="57px" />
            <Skeleton height="57px" />
            <Skeleton height="57px" />
            <Skeleton height="57px" />
            <Skeleton height="57px" />
            <Skeleton height="57px" />
          </Stack>
        )}
      </Flex>
    </>
  );
};
export default MainManagers;
