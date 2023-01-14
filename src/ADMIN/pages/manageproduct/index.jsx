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
  Link,
  useToast,
  Center,
  Heading,
  Badge,
} from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { getallproducts } from "../../../pages/home/helper";
import { getAllProdcuts } from "../../../reducer/product/action";
import { NavLink, useParams } from "react-router-dom";
import { removeproduct } from "../../helper/product";
import { isAuthenticate } from "../../../helper/auth";

const ManageProduct = () => {
  const tableHeadingColor = useColorModeValue("green.600", "green.400");
  const linkColor = useColorModeValue("blue.500", "blue.300");
  const [removeLoading, setRemoveLoading] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();
  const { adminId } = useParams();
  const token = isAuthenticate();
  const { products, rerender } = useSelector((state) => state.PRODUCT);
  useEffect(() => {
    if (products.length === 0) {
      getallproducts().then((response) => {
        if (!response.data) {
          return toast({
            position: "top-right",
            title: response.error.message || "Something went wrong",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          dispatch(getAllProdcuts(response?.data?.products));
        }
      });
    }
  }, [rerender]);

  // Remove product
  const removeProduct = (productId) => {
    setRemoveLoading(productId);
    removeproduct(adminId, token, productId).then((response) => {
      setRemoveLoading(false);
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
          title: "The product was successfully removed",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
        dispatch(reRenderProduct());
      }
    });
  };

  return (
    <Sidebar>
      <Center my={10}>
        <Heading>Manage Product</Heading>
        <Badge variant="subtle" colorScheme="green" ml={2}>
          ADMIN
        </Badge>
      </Center>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color={tableHeadingColor}># index</Th>
              <Th color={tableHeadingColor}>product</Th>
              <Th color={tableHeadingColor} isNumeric>
                price
              </Th>
              <Th color={tableHeadingColor} isNumeric>
                sold
              </Th>
              <Th color={tableHeadingColor} isNumeric>
                stock
              </Th>
              <Th color={tableHeadingColor} isNumeric>
                details
              </Th>
              <Th color={useColorModeValue("blue.600", "blue.400")}>update</Th>
              <Th color={useColorModeValue("red.600", "red.400")}>Remove</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product, index) => (
              <Tr key={product?._id}>
                <Td># {index}</Td>
                <Td>{product?.name}</Td>
                <Td isNumeric>{product?.price}</Td>
                <Td isNumeric>{product?.sold}</Td>
                <Td isNumeric>{product?.stock}</Td>
                <Td color={linkColor}>
                  <Link as={NavLink} to={`/product/${product?._id}`}>
                    Details
                  </Link>
                </Td>
                <Td>
                  <Button
                    size={"sm"}
                    colorScheme="blue"
                    onClick={() => {
                      // removeCategory(category?._id);
                    }}
                    // isLoading={removeLoading && category?._id === removeLoading}
                  >
                    Update
                  </Button>
                </Td>
                <Td>
                  {" "}
                  <Button
                    size={"sm"}
                    colorScheme="red"
                    onClick={() => {
                      removeProduct(product?._id);
                    }}
                    isLoading={removeLoading && product?._id === removeLoading}
                  >
                    Remove
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Sidebar>
  );
};

export default ManageProduct;
