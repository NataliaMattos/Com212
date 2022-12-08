import React, { FormEvent, useContext, useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  SimpleGrid,
  Box,
  useToast,
  Heading
} from '@chakra-ui/react'
import axios from 'axios';
import { User, UserContext } from '../../../contexts/user';
import { uuid } from 'uuidv4';

interface dateTable {
  create: (value: boolean) => void;
  userEdit: User[];
  option: string;
}

function UpdateUser({ create, userEdit, option }: dateTable) {

  const [id] = useState(option !== 'create' ? userEdit[0]?.id : "")
  const { setRefresh, refresh } = useContext(UserContext)
  const [name, setName] = useState(option === 'create' ? '' : userEdit[0]?.name)
  const [lastName, setLastName] = useState(option === 'create' ? '' : userEdit[0]?.lastName)
  const [email, setEmail] = useState(option === 'create' ? '' : userEdit[0]?.email)
  const [password, setPassword] = useState(option === 'create' ? '' : userEdit[0]?.password)

  const toast = useToast();

  const handleSubmit = (event: FormEvent) => {
    const unique_id = uuid();
    if(option === 'create'){
    event.preventDefault();
    axios
      .post("http://localhost:3000/user", {
        id: unique_id,
        name: name,
        lastName: lastName,
        email: email,
        password: password,
      })
      .then(() => {
        toast({
          title: "Usuário Cadastrado.",
          description: "Usuário Cadastrado com sucesso.",
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
          description: "Verifique as informações e tente novamente",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setRefresh(!refresh);
      });
    } else if (option === 'update') {
      axios
      .post(`http://localhost:3000/user/${id}`, {
        name: name,
        lastName: lastName,
        email: email,
        password: password,
      })
      .then(() => {
        toast({
          title: "Usuário Atualizado.",
          description: "Usuário Atualizado com sucesso.",
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
          description: "Verifique as informações e tente novamente",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        setRefresh(!refresh);
      });
    };
  };

  const closePage = () => { create(false) }



  return (
  <>
    <form onSubmit={handleSubmit} autoComplete="nope">
      <Flex justifyContent={'center'}>
        <Box width={'100%'} maxWidth={'1200px'}>
          {option === 'create' ? <Text fontSize='3xl' fontWeight={'bold'} mb={'30px'}>Criar Conta</Text> : <Text fontSize='3xl' fontWeight={'bold'} mb={'30px'}>Editar Conta</Text>}
          <Text fontSize='2xl'>Dados da Conta</Text>
          <SimpleGrid minChildWidth={'48%'} spacing='20px' mt={'10px'} mb={'40px'}>
          <FormControl isRequired>
                    <FormLabel htmlFor="name">Nome</FormLabel>
                    <Input
                      id="name"
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
                      id="lastname"
                      max-length="300"
                      borderColor="darkgrey"
                      border="2px"
                      type="text"
                      value={lastName}
                      onChange={(event) => {
                        setLastName(event?.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
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
                      id="senha"
                      max-length="300"
                      borderColor="darkgrey"
                      border="2px"
                      type="text"
                      value={password}
                      onChange={(event) => {
                        setPassword(event?.target.value);
                      }}
                    />
                  </FormControl>
          </SimpleGrid>

          <br></br><br></br>
          <Button colorScheme='green' mr={3} type='submit'value='submit'>Salvar</Button>
          <Button onClick={closePage} colorScheme='red'>Cancelar</Button>
        </Box>
      </Flex>
    </form>
  </>
  )
}
export default UpdateUser;