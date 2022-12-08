import DemandMain from "./Main";
import { DemandProvider } from "../../contexts/demand";
import { Box, Heading } from "@chakra-ui/react";

export const Demand = () => {
  return (
    <>
      <Box margin="0 auto" padding={"2rem"}>
        <Heading title="Cadastro Blacklist" />
        <DemandProvider>
          <DemandMain />
        </DemandProvider>
      </Box>
    </>
  );
};
