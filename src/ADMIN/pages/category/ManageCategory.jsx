import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "@chakra-ui/react";
import { getcategory } from "../../../helper/category";
import { getAllCategories } from "../../../reducer/category/action";

const ManageCategory = () => {
  const tableHeadingColor = useColorModeValue("green.600", "green.400");
  const dispatch = useDispatch();
  const { categories, rerender } = useSelector((state) => state.CATEGORY);
  //Get all category
  useEffect(() => {
    getcategory().then((response) => {
      if (!response.data) {
        return;
      } else {
        dispatch(getAllCategories(response.data?.categories));
      }
    });
  }, [rerender]);
  // Update Category
  const updateCategory = (id) => {
    console.log(id);
  };

  const removeCategory = (id) => {
    console.log(id);
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th color={tableHeadingColor}>#index</Th>
            <Th color={tableHeadingColor}>category</Th>
            <Th color={tableHeadingColor}>product in</Th>
            <Th color={useColorModeValue("blue.600", "blue.400")}>update</Th>
            <Th color={useColorModeValue("red.600", "red.400")}>Remove</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category, index) => (
            <Tr key={category?._id}>
              <Td># {index}</Td>
              <Td>{category?.name}</Td>
              <Td>{category?.products?.length}</Td>
              <Td>
                <Button
                  size={"sm"}
                  colorScheme="blue"
                  onClick={() => {
                    updateCategory(category?._id);
                  }}
                >
                  Update
                </Button>
              </Td>
              <Td>
                <Button
                  size={"sm"}
                  colorScheme="red"
                  onClick={() => {
                    removeCategory(category?._id);
                  }}
                >
                  Remove
                </Button>
              </Td>
            </Tr>
          ))}
          {/* <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr> */}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ManageCategory;
