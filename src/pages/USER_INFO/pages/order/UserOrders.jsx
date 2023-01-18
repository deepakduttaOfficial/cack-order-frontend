import React from "react";
import { NavLink } from "react-router-dom";
import {
  Badge,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

const UserOrders = ({ orders }) => {
  const tableHeadingColor = useColorModeValue("green.600", "green.400");
  const linkColor = useColorModeValue("blue.500", "blue.300");

  const dateFormater = (createdAt) => {
    const date = new Date(createdAt);
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
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
          {orders?.map((order, index) => {
            return (
              <Tr key={order?._id}>
                <Td># {index}</Td>

                <Td>{order?.orderItems?.length}</Td>
                <Td>{order?.paymentInfo?.razorpay_order_id}</Td>
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
  );
};

export default UserOrders;
