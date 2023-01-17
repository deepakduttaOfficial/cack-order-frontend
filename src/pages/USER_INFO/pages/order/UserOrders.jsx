import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  Badge,
  Heading,
  Image,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

import { isAuthenticate } from "../../../../helper/auth";
import { getuserorders } from "../../helper/order";
import noOrderFound from "../../../../assets/Illustration/no_order_found.svg";

const UserOrders = () => {
  const tableHeadingColor = useColorModeValue("green.600", "green.400");
  const linkColor = useColorModeValue("blue.500", "blue.300");
  const token = isAuthenticate();
  const { userId } = useParams();
  const dateFormater = (createdAt) => {
    const date = new Date(createdAt);
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getuserorders(userId, token).then((response) => {
      if (!response.data) {
        setOrders([]);
      } else {
        setOrders(response.data?.orders);
      }
    });
  }, []);

  return (
    <>
      <VStack my={10}>
        <Heading color={useColorModeValue("gray.500", "gray.400")}>
          {orders.length === 0
            ? "No orders have been placed at this time."
            : "Your orders"}
        </Heading>
      </VStack>
      {orders.length === 0 ? (
        <VStack w={"full"}>
          <Image src={noOrderFound} w={"96"} />
        </VStack>
      ) : (
        <TableContainer bgColor={useColorModeValue("white", "gray.900")}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th color={tableHeadingColor}># index</Th>

                <Th color={tableHeadingColor}>order-items</Th>
                <Th color={tableHeadingColor}>payment-id</Th>
                <Th color={tableHeadingColor}>created-order</Th>
                <Th color={tableHeadingColor}>Status</Th>
                <Th color={tableHeadingColor} isNumeric>
                  total-amount
                </Th>
                <Th color={tableHeadingColor}>order-info</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order, index) => {
                return (
                  <Tr key={order?._id}>
                    <Td># {index}</Td>

                    <Td>{order?.orderItems?.length}</Td>
                    <Td>{order?.paymentInfo?.id}</Td>
                    <Td>{dateFormater(order.createdAt)}</Td>
                    <Td>
                      {order?.orderStatus === "SHIPPED" ? (
                        <Badge variant="subtle" colorScheme="green">
                          {order?.orderStatus}
                        </Badge>
                      ) : (
                        <Badge colorScheme="red">{order?.orderStatus}</Badge>
                      )}
                    </Td>
                    <Td isNumeric>{order?.totalAmount}</Td>

                    <Td color={linkColor}>
                      <Link as={NavLink} to={`/`}>
                        Details
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UserOrders;
