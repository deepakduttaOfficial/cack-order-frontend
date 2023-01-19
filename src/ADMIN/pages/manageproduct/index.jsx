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
  Heading,
  Badge,
  AspectRatio,
  Image,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { getallproducts } from "../../../pages/home/helper";
import {
  getAllProdcuts,
  reRenderProduct,
} from "../../../reducer/product/action";
import { NavLink, useParams } from "react-router-dom";
import { removeproduct } from "../../helper/product";
import { isAuthenticate } from "../../../helper/auth";
import { BiSearch } from "react-icons/bi";

const ManageProduct = () => {
  const tableHeadingColor = useColorModeValue("green.600", "green.400");
  const linkColor = useColorModeValue("blue.500", "blue.300");
  const [removeLoading, setRemoveLoading] = useState(false);
  const [filterVal, setFilterVal] = useState([]);

  const dispatch = useDispatch();
  const toast = useToast();
  const { adminId } = useParams();
  const token = isAuthenticate();
  const { products, rerender } = useSelector((state) => state.PRODUCT);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const { minPrice, maxPrice } = filter;
  useEffect(() => {
    getallproducts({ search, minPrice, maxPrice }).then((response) => {
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
        setFilterVal(response?.data?.products);
      }
    });
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

  let filterProduct = filterVal.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Sidebar>
      <VStack my={10}>
        <Badge variant="subtle" colorScheme="green">
          ADMIN
        </Badge>
        <Heading mb="1">Manage Product</Heading>
        <InputGroup w={"70%"}>
          <InputLeftElement
            pointerEvents="none"
            children={<BiSearch color="gray.300" />}
          />
          <Input
            type="search"
            placeholder="Enter product name..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </InputGroup>
      </VStack>
      <TableContainer bgColor={useColorModeValue("white", "gray.900")}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color={tableHeadingColor}># index</Th>
              <Th color={tableHeadingColor}>images</Th>
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
              <Th color={tableHeadingColor}>details</Th>
              <Th color={useColorModeValue("blue.600", "blue.400")}>update</Th>
              <Th color={useColorModeValue("red.600", "red.400")}>Remove</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filterProduct.map((product, index) => (
              <Tr key={product?._id}>
                <Td># {index}</Td>
                <Td>
                  <AspectRatio ratio={16 / 9}>
                    <Image src={product?.photos[0]?.secure_url} />
                  </AspectRatio>
                </Td>
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
                    as={NavLink}
                    to={`/admin/${adminId}/dashboard/updateproduct/${product?._id}`}
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
