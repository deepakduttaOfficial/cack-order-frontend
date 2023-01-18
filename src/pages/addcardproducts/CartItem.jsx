import React, { useEffect } from "react";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { PriceTag } from "./PriceTag";
import { removeaddcard, updateQuantity } from "../../helper/addCard";
import { useDispatch } from "react-redux";
import { updateAddCard } from "../../reducer/UI/action";
import CartProduct from "./CartProduct";
import { useState } from "react";

const NewButton = ({ children, value, ...rest }) => {
  const lightColor = value <= 1 ? "gray.200" : "gray.100";
  const darktColor = value <= 1 ? "gray.700" : "gray.600";

  return (
    <Button
      p={1}
      bgColor={useColorModeValue(lightColor, darktColor)}
      h={6}
      w={6}
      rounded="lg"
      {...rest}
    >
      {children}
    </Button>
  );
};

const CartItem = (props) => {
  const [productId, setProductId] = useState("");
  const [value, setValue] = useState(() => {
    if (props.quantity) {
      return props.quantity;
    }
    return 1;
  });

  const dispatch = useDispatch();

  const onClickDelete = (id) => {
    removeaddcard(id);
    dispatch(updateAddCard());
  };

  const handleQuan = ({ val, limit, id }) => {
    setProductId(id);
    if (value === limit) {
      return;
    }
    setValue((preVal) => preVal + val);
    dispatch(updateAddCard());
  };

  useEffect(() => {
    updateQuantity(value, productId);
  }, [value]);

  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
      align="center"
    >
      <CartProduct
        name={props?.name}
        description={props?.description}
        image={props?.photos[0].secure_url}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: "none",
          md: "flex",
        }}
      >
        <HStack
          bg={useColorModeValue("gray.200", "gray.700")}
          px={2}
          rounded="lg"
          py={1}
          ml={2}
        >
          <NewButton
            value={value}
            onClick={() => {
              handleQuan({ val: -1, limit: 1, id: props._id });
            }}
          >
            -
          </NewButton>
          <Box mx={2} userSelect="none">
            {value}
          </Box>
          <NewButton
            onClick={() => {
              handleQuan({ val: 1, limit: props.stock, id: props._id });
            }}
          >
            +
          </NewButton>
        </HStack>

        <PriceTag price={props.price * value} currency={"INR"} />

        <CloseButton
          onClick={() => {
            onClickDelete(props._id);
          }}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: "flex",
          md: "none",
        }}
      >
        <Link
          fontSize="sm"
          textDecor="underline"
          onClick={() => {
            onClickDelete(props._id);
          }}
        >
          Delete
        </Link>

        <HStack
          bg={useColorModeValue("gray.200", "gray.700")}
          px={2}
          rounded="lg"
          py={1}
          ml={2}
        >
          <NewButton
            value={value}
            onClick={() => {
              handleQuan({ val: -1, limit: 1, id: props._id });
            }}
          >
            -
          </NewButton>
          <Box mx={2} userSelect="none">
            {value}
          </Box>
          <NewButton
            onClick={() => {
              handleQuan({ val: 1, limit: props.stock, id: props._id });
            }}
          >
            +
          </NewButton>
        </HStack>

        <PriceTag price={props.price * value} currency={"INR"} />
      </Flex>
    </Flex>
  );
};

export default CartItem;
