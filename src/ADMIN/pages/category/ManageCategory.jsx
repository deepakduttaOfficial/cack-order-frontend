import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
  useToast,
} from "@chakra-ui/react";
import { getcategory } from "../../../helper/category";
import {
  getAllCategories,
  reRenderCategory,
} from "../../../reducer/category/action";
import UpdateCategory from "./UpdateCategory";
import { removecategory } from "../../helper/category";
import { isAuthenticate } from "../../../helper/auth";

const ManageCategory = () => {
  const tableHeadingColor = useColorModeValue("green.600", "green.400");
  const dispatch = useDispatch();
  const toast = useToast();
  const { categories, rerender } = useSelector((state) => state.CATEGORY);
  const { adminId } = useParams();
  const token = isAuthenticate();
  const [removeLoading, setRemoveLoading] = useState(false);

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

  // Remove category
  const removeCategory = (categoryId) => {
    setRemoveLoading(true);
    removecategory(adminId, token, categoryId).then((response) => {
      setRemoveLoading(categoryId);
      if (!response.data) {
        return toast({
          position: "top-right",
          title: response.error.message || "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          position: "top-right",
          title: "The category was successfully removed",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
        dispatch(reRenderCategory());
      }
    });
  };

  return (
    <TableContainer bgColor={useColorModeValue("white", "gray.900")}>
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
                <UpdateCategory id={category?._id} adminId={adminId} />
              </Td>
              <Td>
                <Button
                  size={"sm"}
                  colorScheme="red"
                  onClick={() => {
                    removeCategory(category?._id);
                  }}
                  isLoading={removeLoading && category?._id === removeLoading}
                >
                  Remove
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ManageCategory;
