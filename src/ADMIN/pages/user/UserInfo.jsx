import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  Button,
  Badge,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { isAuthenticate } from "../../../helper/auth";

import Sidebar from "../../components/Sidebar";
import { getallusers } from "../../helper/user";

import { AiFillInfoCircle } from "react-icons/ai";

const UserInfo = () => {
  const tableHeadingColor = useColorModeValue("green.600", "green.400");
  const [users, setUsers] = useState([]);
  const { adminId } = useParams();
  const token = isAuthenticate();
  useEffect(() => {
    getallusers(adminId, token).then((response) => {
      if (!response.data) {
        return [];
      } else {
        setUsers(response.data?.users);
      }
    });
  }, []);

  const updateUser = (id) => {
    console.log(id);
  };

  return (
    <Sidebar>
      <VStack my={10}>
        <Badge variant="subtle" colorScheme="green">
          ADMIN
        </Badge>
        <Heading>Manage User</Heading>
      </VStack>
      <TableContainer bgColor={useColorModeValue("white", "gray.900")}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color={tableHeadingColor}>#index</Th>
              <Th color={tableHeadingColor}>name</Th>
              <Th color={tableHeadingColor}>email</Th>
              <Th isNumeric color={tableHeadingColor}>
                login-Count
              </Th>
              <Th color={tableHeadingColor}>role</Th>
              <Th color={tableHeadingColor}>Verified</Th>
              <Th color={tableHeadingColor}>Created-Account</Th>
              <Th color={useColorModeValue("blue.600", "blue.400")}>Info</Th>
              <Th color={useColorModeValue("blue.600", "blue.400")}>update</Th>
              {/* <Th color={useColorModeValue("red.600", "red.400")}>Remove</Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => {
              const date = new Date(user?.createdAt);
              const options = {
                day: "2-digit",
                month: "short",
                year: "numeric",
              };
              const formattedDate = date.toLocaleDateString("en-US", options);

              return (
                <Tr key={user?._id}>
                  <Td># {index}</Td>
                  <Td>{user?.name}</Td>
                  <Td>{user?.email}</Td>
                  <Td isNumeric>{user?.loginCount}</Td>
                  <Td>
                    {user?.role === "ADMIN" ? (
                      <Badge variant="subtle" colorScheme="pink">
                        {user?.role}
                      </Badge>
                    ) : (
                      <Badge colorScheme="green">{user?.role}</Badge>
                    )}
                  </Td>
                  <Td>
                    {user?.isVerified ? (
                      <Badge variant="subtle" colorScheme="green">
                        Varify
                      </Badge>
                    ) : (
                      <Badge colorScheme="orange">Not-varify</Badge>
                    )}
                  </Td>
                  <Td>{formattedDate}</Td>
                  <Td>
                    <Button
                      size={"sm"}
                      colorScheme="blue"
                      onClick={() => {
                        updateUser(user?._id);
                      }}
                      leftIcon={<AiFillInfoCircle />}
                      // isLoading={removeLoading && category?._id === removeLoading}
                    >
                      Info
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      size={"sm"}
                      colorScheme="green"
                      onClick={() => {
                        updateUser(user?._id);
                      }}
                      // isLoading={removeLoading && category?._id === removeLoading}
                    >
                      Update
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Sidebar>
  );
};

export default UserInfo;
