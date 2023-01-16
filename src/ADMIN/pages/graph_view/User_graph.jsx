import {
  Box,
  Divider,
  Heading,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isAuthenticate } from "../../../helper/auth";
import Graph_Comp from "../../components/Graph_Comp";
import { getallusers } from "../../helper/user";
import { months } from "../month";

const User_graph = () => {
  const { adminId } = useParams();
  const token = isAuthenticate();
  const [createdMonth, setCreatedMonth] = useState([]);
  useEffect(() => {
    getallusers(adminId, token).then((response) => {
      if (!response.data) {
        setCreatedMonth([]);
      } else {
        let users = response.data?.users;
        let dateArry = [];
        users.map((user) => {
          const date = new Date(user?.createdAt);
          dateArry.push(months[date.getMonth()]);
        });
        setCreatedMonth(dateArry);
      }
    });
  }, []);

  return (
    <VStack
      borderBottom="2px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      w={"full"}
      py={"5"}
    >
      <Heading
        textAlign={"center"}
        mt={"14"}
        mb={"5"}
        px={"5"}
        color={useColorModeValue("gray.500", "gray.400")}
      >
        This Chart illustrates the number of User/month
      </Heading>
      <Box bgColor="white" w={"full"}>
        <Graph_Comp createdMonth={createdMonth} label={"User"} />
      </Box>
    </VStack>
  );
};

export default User_graph;
