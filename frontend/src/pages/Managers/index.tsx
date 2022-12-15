import { Box, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { Manager, ManagerProvider } from "../../contexts/manager";
import UpdateManager from "./Create-update";
import MainManagers from "./Main";


export const Managers = () => {

  const [create, setCreate] = useState(false);
  const [managerData, setManagerData] = useState<Manager[]>([]);
  const [operation, setOperation] = useState<string>("");

  return (
    <>
      <Box margin='0 auto' padding={'2rem'}>
        {/* <ManagersProvider> */}
          {/* <TitlePage title='Contas' /> */}
          <ManagerProvider>
            {create ? <UpdateManager option={operation} create={setCreate} managerEdit={managerData} /> : <MainManagers create={setCreate} ManagerEdit={setManagerData}  setOption={setOperation} />}
          </ManagerProvider>
        {/* </ManagersProvider> */}
      </Box>
    </>
  );
};
