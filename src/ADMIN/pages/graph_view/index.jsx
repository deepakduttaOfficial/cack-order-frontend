import { Heading, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Sidebar from "../../components/Sidebar";
import Order_graph from "./Order_graph";
import Product_graph from "./Product_graph";
import User_graph from "./User_graph";

const GraphView = () => {
  return (
    <Sidebar>
      <Heading
        textAlign={"center"}
        color={useColorModeValue("gray.600", "gray.300")}
      >
        2023 Latest Chart
      </Heading>
      <User_graph />
      <Product_graph />
      <Order_graph />
    </Sidebar>
  );
};

export default GraphView;
