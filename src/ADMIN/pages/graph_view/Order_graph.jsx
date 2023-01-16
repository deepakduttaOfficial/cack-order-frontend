import { Box, Heading, useColorModeValue, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { isAuthenticate } from "../../../helper/auth";
import Graph_Comp from "../../components/Graph_Comp";
import { getallorders } from "../../helper/order";
import { months } from "../month";

const Order_graph = () => {
  const { adminId } = useParams();
  const token = isAuthenticate();
  const [createdMonth, setCreatedMonth] = useState([]);
  useEffect(() => {
    getallorders(adminId, token).then((response) => {
      if (!response.data) {
        setCreatedMonth([]);
      } else {
        let orders = response.data?.orders;
        let dateArry = [];
        orders.map((order) => {
          const date = new Date(order?.createdAt);
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
        This Chart illustrates the number of Order/month
      </Heading>
      <Box bgColor="white" w={"full"}>
        <Graph_Comp createdMonth={createdMonth} label={"Order"} />
      </Box>
    </VStack>
  );
};

export default Order_graph;
