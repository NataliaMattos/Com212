import React, { useContext, useEffect } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useState, FormEvent } from "react";
import logoLogin from "../../assets/images/logologin.png";
import {
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  Image,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Box,
  useColorMode,
  Flex,
} from "@chakra-ui/react";
// import { AuthContext } from '../../contexts/AuthContext';

// import { Flex, animationFlex, itemAnimation } from '../../components/Styles/motion-animate/animate';
import { FiMoon, FiSun } from "react-icons/fi";
import { AccountContext, AccountProvider } from "../../contexts/login";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { isLogin, setLogin } = useContext(AccountContext);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("aqui");
    setLogin({ login: username, senha: password });
  };

  useEffect( () => {
    if(isLogin === 1 ){
        navigate('/Dashboard')
    }
    console.log(isLogin);
}, [isLogin]);


  return (
      <Box bg={useColorModeValue("white", "gray.800")}>
        <Flex>
          <Button onClick={toggleColorMode} margin="0 auto" marginTop={"10px"}>
            {colorMode === "light" ? <FiMoon /> : <FiSun />}
          </Button>
        </Flex>
        <Stack
          minH={"100vh"}
          maxWidth={"1280px"}
          margin="0 auto"
          direction={{ base: "column", md: "row" }}
        >
          <Flex p={8} flex={1} align={"center"} justify={"center"}>
            <Stack spacing={4} w={"full"} maxW={"md"}>
              <form onSubmit={handleLoginSubmit}>
                <Heading
                  color={"#058007"}
                  fontSize={"4xl"}
                  mb={"10"}
                  textAlign={"center"}
                >
                  Compartilhamento de Mídias Digitais
                </Heading>
                <Flex>
                  <FormControl id="email" marginBottom="1.5rem">
                    <InputGroup>
                      <InputLeftElement
                        height={"100%"}
                        pointerEvents="none"
                        children={<FaEnvelope />}
                      />
                      <Input
                        size="lg"
                        borderRadius={"100px"}
                        placeholder="Username"
                        focusBorderColor="green.500"
                        variant="filled"
                        type="text"
                        color={"black"}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        isRequired
                      />
                    </InputGroup>
                  </FormControl>
                </Flex>
                <Flex>
                  <FormControl id="password">
                    <InputGroup>
                      <InputLeftElement
                        height={"100%"}
                        pointerEvents="none"
                        children={<FaLock />}
                      />
                      <Input
                        size="lg"
                        borderRadius={"100px"}
                        placeholder="Password"
                        focusBorderColor="green.500"
                        variant="filled"
                        type="password"
                        color={"black"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isRequired
                      />
                    </InputGroup>
                  </FormControl>
                </Flex>
                <Flex display={"block"} m={"0 auto"}>
                  <Stack spacing={6}>
                    <Button
                      size="lg"
                      borderRadius={"100px"}
                      mt={"10"}
                      backgroundColor={"#058007"}
                      colorScheme={"green"}
                      variant={"solid"}
                      type="submit"
                      value="submit"
                    >
                      Login
                    </Button>
                  </Stack>
                </Flex>
              </form>
            </Stack>
          </Flex>

          <Flex flex={1} align={"center"} justify={"center"}>
            <Image
              // width={'500px'}
              px={["20%", "20%", "5%"]}
              alt={"Login Image"}
              objectFit={"cover"}
              src={logoLogin}
            />
          </Flex>
        </Stack>
      </Box>
  );
}
