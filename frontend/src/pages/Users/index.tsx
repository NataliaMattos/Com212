import { Box, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { User, UserProvider } from "../../contexts/user";
import UpdateUser from "./Create-update";
import MainUsers from "./Main";


export const Users = () => {

  const [create, setCreate] = useState(false);
  const [userData, setUserData] = useState<User[]>([]);
  const [operation, setOperation] = useState<string>("");

  return (
    <>
      <Box margin='0 auto' padding={'2rem'}>
        {/* <UsersProvider> */}
          {/* <TitlePage title='Contas' /> */}
          <UserProvider>
            {create ? <UpdateUser option={operation} create={setCreate} userEdit={userData} /> : <MainUsers create={setCreate} UserEdit={setUserData}  setOption={setOperation} />}
          </UserProvider>
        {/* </UsersProvider> */}
      </Box>
    </>
  );
};
