import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Links {
  navItem: string,
  route: string
}


const Links = [{navItem:"Demandas", route: "Demand"},{navItem:"Criar Demanda", route: "Order"}, {navItem:"Usuários", route: "Users"}, {navItem:"Gerentes", route: "Managers"}, {navItem:"Administradores", route: "Admin"}];

const NavLink = ({ to, children }: { to: any; children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={to}
  >
    {children}
  </Link>
);

export default function NavBar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userType");
    navigate("/", {
      replace: true,
    });
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link: Links) => (
                <NavLink to={link.route} key={link.route}>
                  {link.navItem}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Button
            onClick={() => {
              handleLogout();
            }}
          >
            Sair
          </Button>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink to={link.route} key={link.route}>
                  {link.navItem}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box>{children}</Box>
    </>
  );
}
