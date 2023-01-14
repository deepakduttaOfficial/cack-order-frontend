import { Divider, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Sidebar from "../../components/Sidebar";
import CreateCategory from "./CreateCategory";
import ManageCategory from "./ManageCategory";

const Category = () => {
  return (
    <Sidebar>
      <CreateCategory />
      <Divider bgColor={useColorModeValue("gray.200", "gray.700")} />
      <ManageCategory />
    </Sidebar>
  );
};

export default Category;
