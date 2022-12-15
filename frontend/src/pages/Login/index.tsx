import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import logoLogin from "../../assets/images/logologin.png";
// import { AuthContext } from '../../contexts/AuthContext';

// import { Flex, animationFlex, itemAnimation } from '../../components/Styles/motion-animate/animate';
import { FiMoon, FiSun } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const { colorMode, toggleColorMode } = useColorMode();

  // useEffect(() => {
  //   const userType = localStorage.getItem("userType");

  //   if (!userType) return;

  //   navigate("/Demand");
  // }, [navigate]);

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      axios.post("/login", {
        email,
        password,
      }).then((response) => {
        localStorage.setItem("userType", response.data.code);     
        navigate("/Demand");
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Usuário ou senha incorretos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  };

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
                      id="emailLogin"
                      size="lg"
                      borderRadius={"100px"}
                      placeholder="Username"
                      focusBorderColor="green.500"
                      variant="filled"
                      type="text"
                      color={"black"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      isRequired
                    />
                  </InputGroup>
                </FormControl>
              </Flex>
              <Flex>
                <FormControl id="password">
                  <InputGroup>
                    <InputLeftElement
                      height={"100% "}
                      pointerEvents="none"
                      children={<FaLock />}
                    />
                    <Input
                    id="passwordLogin"
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
                    id="buttonLogin"
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
