import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  Link,
  Button,
  Badge,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import UpdateOrder from "./UpdateOrder";

const GetAllOrders = ({ orders }) => {
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
            <Th color={tableHeadingColor}>name</Th>
            <Th color={tableHeadingColor}>email</Th>
            <Th color={tableHeadingColor} isNumeric>
              total-amount
            </Th>
            <Th color={tableHeadingColor} isNumeric>
              order-items
            </Th>
            <Th color={tableHeadingColor}>payment-id</Th>
            <Th color={tableHeadingColor}>created-order</Th>
            <Th color={tableHeadingColor}>Status</Th>
            <Th color={tableHeadingColor}>order-info</Th>
            <Th color={useColorModeValue("blue.600", "blue.400")}>update</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order, index) => {
            return (
              <Tr key={order?._id}>
                <Td># {index}</Td>

                <Td>{order?.user?.name}</Td>
                <Td>{order?.user?.email}</Td>
                <Td isNumeric>{order?.totalAmount}</Td>
                <Td isNumeric>{order?.orderItems?.length}</Td>
                <Td>
                  {order?.paymentInfo?.id ||
                    order?.paymentInfo?.razorpay_order_id}
                </Td>
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

                <Td color={linkColor}>
                  <Link as={NavLink} to={`/`}>
                    Details
                  </Link>
                </Td>

                <Td>
                  <UpdateOrder id={order?._id} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default GetAllOrders;
