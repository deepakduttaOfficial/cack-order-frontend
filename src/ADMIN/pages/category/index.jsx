import {
  Badge,
  Center,
  Divider,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import Sidebar from "../../components/Sidebar";
import CreateCategory from "./CreateCategory";
import ManageCategory from "./ManageCategory";

const Category = () => {
  return (
    <Sidebar>
      <Center>
        <Heading>Manage Category</Heading>
        <Badge variant="subtle" colorScheme="green" ml={2}>
          ADMIN
        </Badge>
      </Center>
      <CreateCategory />
      <Divider bgColor={useColorModeValue("gray.200", "gray.700")} />
      <ManageCategory />
    </Sidebar>
  );
};

export default Category;
