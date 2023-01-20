import { Heading, Image, useColorModeValue, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isAuthenticate } from "../../../../helper/auth";
import Sidebar from "../../components/Sidebar";
import { getuserorders } from "../../helper/order";
import UserOrders from "./UserOrders";
import no_order_found from "../../../../assets/Illustration/no_order_found.svg";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const token = isAuthenticate();
  const { userId } = useParams();
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
    <Sidebar>
      <VStack my={10}>
        <Heading color={useColorModeValue("gray.500", "gray.400")}>
          {orders.length === 0
            ? "No orders have been placed at this time."
            : "Your orders"}
        </Heading>
      </VStack>
      {orders?.length === 0 ? (
        <Image src={no_order_found} w={"96"} mx="auto" />
      ) : (
        <UserOrders orders={orders} />
      )}
    </Sidebar>
  );
};
export default Order;
