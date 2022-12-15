import { Box, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { Admin, AdminProvider } from "../../contexts/admin";
import UpdateAdmin from "./Create-update";
import MainAdmins from "./Main";


export const Admins = () => {

  const [create, setCreate] = useState(false);
  const [adminData, setAdminData] = useState<Admin[]>([]);
  const [operation, setOperation] = useState<string>("");

  return (
    <>
      <Box margin='0 auto' padding={'2rem'}>
        {/* <AdminsProvider> */}
          {/* <TitlePage title='Contas' /> */}
          <AdminProvider>
            {create ? <UpdateAdmin option={operation} create={setCreate} adminEdit={adminData} /> : <MainAdmins create={setCreate} AdminEdit={setAdminData}  setOption={setOperation} />}
          </AdminProvider>
        {/* </AdminsProvider> */}
      </Box>
    </>
  );
};
