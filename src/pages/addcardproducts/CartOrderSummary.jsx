import {
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { getaddcard, totalPrice } from "../../helper/addCard";
import { formatPrice } from "./PriceTag";
import { useDispatch } from "react-redux";
import { addItems } from "../../reducer/order/action";
import { useNavigate, useParams } from "react-router-dom";
import { getLocalUser, isAuthenticate } from "../../helper/auth";

const OrderSummaryItem = (props) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

const CartOrderSummary = ({ products }) => {
  const total = totalPrice(products);
  const user = getLocalUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addItemsCard = () => {
    let items = [];
    getaddcard().map((item) => {
      items.push({
        quantity: item.quantity || 1,
        price: item.price,
        productId: item._id,
      });
    });
    const payload = {
      items,
      totalAmount: total,
    };
    dispatch(addItems(payload));
    navigate(`/order/create-order/${user._id}`);
  };
  let disabled =
    !isAuthenticate() || products?.length === 0 || !user?.isVerified;

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={formatPrice(total)} />
        <OrderSummaryItem label="Shipping + Tax">0</OrderSummaryItem>
        <OrderSummaryItem label="Coupon Code">
          <Input w={"24"} placeholder={"Cupon"} disabled />
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(total)}
          </Text>
        </Flex>
      </Stack>

      <Button
        colorScheme="blue"
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
        onClick={addItemsCard}
        disabled={disabled}
      >
        Checkout
      </Button>
    </Stack>
  );
};

export default CartOrderSummary;
