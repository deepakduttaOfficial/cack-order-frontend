import React, { useEffect, useState } from "react";
import { Badge, Heading, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { isAuthenticate } from "../../../helper/auth";
import Sidebar from "../../components/Sidebar";
import { getallorders } from "../../helper/order";
import GetAllOrders from "./GetAllOrders";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const { adminId } = useParams();
  const token = isAuthenticate();
  const { rerender } = useSelector((state) => state.ORDER);
  useEffect(() => {
    getallorders(adminId, token).then((response) => {
      if (!response.data) {
        return [];
      } else {
        setOrders(response.data?.orders);
      }
    });
  }, [rerender]);
  return (
    <Sidebar>
      <VStack my={10}>
        <Badge variant="subtle" colorScheme="green">
          ADMIN
        </Badge>
        <Heading>Manage Orders</Heading>
      </VStack>
      <GetAllOrders orders={orders} />
    </Sidebar>
  );
};

export default ManageOrder;
