import {
  Box,
  Button,
  Flex,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DemandContext } from "../../../contexts/demand";
import CreateModal from "../Modal/Create-update";
import DeleteModal from "../Modal/Delete";

export interface Demand {
  data: {
    filename: string;
    id: number;
    extension: string;
    category: string;
    path: string;
    user_id: string;
  };
}

function DemandMain() {
  const [files, setFiles] = useState<Demand["data"][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { refresh } = useContext(DemandContext);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoading(false);
    axios
      .get("http://localhost:3000/orders", { params: { userId } })
      .then((response) => {
        setFiles(response.data);
        setIsLoading(true);
      });
  }, [refresh]);

  const findDownload = (path: string) => {
    console.log("path");
  };

  return (
    <>
      <Flex flexDirection="column" w="100%" marginTop={10}>
        <Box margin="0 auto">
          <Text fontSize="3xl" fontWeight={"bold"} w="100%">
            Baixar
          </Text>
          {isLoading ? (
            <Table variant="simple" width={"70vw"}>
              <Thead>
                <Tr>
                  <Th>Titulo</Th>
                  <Th>categoria</Th>
                  <Th>Extensao</Th>
                  <Th>Download</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {files.map((elem: Demand['data'], i: number) => {
                  return (
                    <Tr key={i}>
                      <Td>{elem.filename}</Td>
                      <Td>{elem.category}</Td>
                      <Td>{elem.extension}</Td>
                      <Td>
                        <Button>
                          <a
                            download={elem.filename + "." + elem.extension}
                            href={elem.path}
                          >
                            Download
                          </a>
                        </Button>
                      </Td>
                      <Td>
                        <Box display="flex" justifyContent="space-evenly">
                          <CreateModal data={elem} />
                          <DeleteModal user={elem.filename} id={elem.id} />
                        </Box>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          ) : (
            <Stack mt="50px" width={"70vw"}>
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
        </Box>
      </Flex>
    </>
  );
}
export default DemandMain;
