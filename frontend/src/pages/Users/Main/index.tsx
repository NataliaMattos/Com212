import React, { useContext, useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
  Button,
  Box,
  Spacer,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Skeleton,
  Heading,
} from "@chakra-ui/react";
import { FiEdit, FiSearch } from "react-icons/fi";
import { User, UserContext, Users } from '../../../contexts/user';
import DeleteModal from "../delete";
interface MainUsersProps {
  create: (value: boolean) => void;
  UserEdit: (value: User[]) => void;
  setOption: (value: string) => void;
}

const MainUsers: React.FC<MainUsersProps> = ({
  create, UserEdit,  setOption
}: MainUsersProps): React.ReactElement => {
  const { users, isLoading} = useContext(UserContext)
  
  const [User, setUser] = useState<Users[]>([]);
  const [createUsers, setCreateUsers] = useState(false);
  const [conta, setConta] = useState<User>();
  const [newOperation, setnewOperation] = useState<string>('');

  useEffect(() => {
    setUser(users);
  }, [users]);

  useEffect(() => {
    create(createUsers)
  }, [createUsers]);

  useEffect(() => {
    return UserEdit(conta ? [conta] : []);
  }, [conta]);

  useEffect(() => {
    setOption(newOperation)
  }, [newOperation]);

  return (
  <>
  { <Heading mb={3}>Lista de Usuários</Heading>}
    <Flex flexDirection="column" w="100%" marginTop={10}>
      <Flex mb='20px' display='flex' alignItems='center'>
        <Spacer/>
        <Box>
        {isLoading ?
          <Button leftIcon={<IoIosAdd />} colorScheme='green' variant='solid'
            onClick={() => {setCreateUsers(true)
              setnewOperation('create')
            }}
          >Adicionar</Button>
          : 
          <Button leftIcon={<IoIosAdd />} colorScheme='green' variant='solid' isDisabled={true}>Adicionar</Button>
          }
        </Box>
      </Flex>
      {isLoading ?
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
        {users.map((elem: Users, i: number) => {
          return (
            <Tr key={i}>
              <Td>{elem.name}</Td> 
              <Td>{elem.lastName}</Td> 
              <Td>{elem.email}</Td> 
              <Td>{elem.password}</Td> 
              <Td>
                <Box display='flex' justifyContent='space-evenly'>
                  <Button size="xs" variant="outline" onClick={() =>  {
                    setCreateUsers(true)
                    setnewOperation('update')
                    setConta(elem)
                  }}>
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
      :
      <Stack mt='50px'>
        <Skeleton height='57px' />
        <Skeleton height='57px' />
        <Skeleton height='57px' />
        <Skeleton height='57px' />
        <Skeleton height='57px' />
        <Skeleton height='57px' />
        <Skeleton height='57px' />
        <Skeleton height='57px' />
        <Skeleton height='57px' />
      </Stack>
    }
    </Flex>
  </>
  );
};
export default MainUsers;