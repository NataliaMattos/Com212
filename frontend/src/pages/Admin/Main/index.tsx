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
import { Admin, AdminContext, Admins } from "../../../contexts/admin";
import DeleteModal from "../delete";
interface MainAdminsProps {
  create: (value: boolean) => void;
  AdminEdit: (value: Admin[]) => void;
  setOption: (value: string) => void;
}

const MainAdmins: React.FC<MainAdminsProps> = ({
  create,
  AdminEdit,
  setOption,
}: MainAdminsProps): React.ReactElement => {
  const { admins, isLoading } = useContext(AdminContext);

  const [Admin, setAdmin] = useState<Admins[]>([]);
  const [createAdmins, setCreateAdmins] = useState(false);
  const [conta, setConta] = useState<Admin>();
  const [newOperation, setnewOperation] = useState<string>("");

  useEffect(() => {
    setAdmin(admins);
  }, [admins]);

  useEffect(() => {
    create(createAdmins);
  }, [create, createAdmins]);

  useEffect(() => {
    return AdminEdit(conta ? [conta] : []);
  }, [AdminEdit, conta]);

  useEffect(() => {
    setOption(newOperation);
  }, [setOption, newOperation]);

  return (
    <>
      {<Heading mb={3}>Lista de Administradores</Heading>}
      <Flex flexDirection="column" w="100%" marginTop={10}>
        <Flex mb="20px" display="flex" alignItems="center">
          <Spacer />
          <Box>
            {isLoading ? (
              <Button
                leftIcon={<IoIosAdd />}
                colorScheme="green"
                variant="solid"
                onClick={() => {
                  setCreateAdmins(true);
                  setnewOperation("create");
                }}
              >
                Adicionar
              </Button>
            ) : (
              <Button
                leftIcon={<IoIosAdd />}
                colorScheme="green"
                variant="solid"
                isDisabled={true}
              >
                Adicionar
              </Button>
            )}
          </Box>
        </Flex>
        {isLoading ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Conta</Th>
                <Th>Código</Th>
                <Th>Status</Th>
                <Th>Tipo</Th>
                <Th>
                  <Text textAlign="center">Ações</Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {admins.map((elem: Admins, i: number) => {
                return (
                  <Tr key={i}>
                    <Td>{elem.name}</Td>
                    <Td>{elem.lastname}</Td>
                    <Td>{elem.email}</Td>
                    <Td>{elem.password}</Td>
                    <Td>
                      <Box display="flex" justifyContent="space-evenly">
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() => {
                            setCreateAdmins(true);
                            setnewOperation("update");
                            setConta(elem);
                          }}
                        >
                          <FiEdit />
                        </Button>
                        <DeleteModal name={elem.name} id={elem.id} />
                      </Box>
                    </Td>
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
export default MainAdmins;
