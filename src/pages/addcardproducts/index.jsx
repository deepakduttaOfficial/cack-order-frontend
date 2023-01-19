import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getaddcard } from "../../helper/addCard";
import CartItem from "./CartItem";
import CartOrderSummary from "./CartOrderSummary";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

import { BiArrowBack } from "react-icons/bi";
import { getLocalUser, isAuthenticate } from "../../helper/auth";

const Addcardproducts = () => {
  const user = getLocalUser();
  const token = isAuthenticate();
  const [products, setproducts] = useState([]);
  const { updateaddcard } = useSelector((state) => state.UI);
  useEffect(() => {
    setproducts(getaddcard());
  }, [updateaddcard]);

  return (
    <>
      {token && !user?.isVerified && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Varify your account to place order</AlertTitle>
        </Alert>
      )}
      <Box
        maxW={{
          base: "3xl",
          lg: "7xl",
        }}
        mx="auto"
        px={{
          base: "4",
          md: "8",
          lg: "12",
        }}
        py={{
          base: "6",
          md: "8",
          lg: "12",
        }}
      >
        <Stack
          direction={{
            base: "column",
            lg: "row",
          }}
          align={{
            lg: "flex-start",
          }}
          spacing={{
            base: "8",
            md: "16",
          }}
        >
          <Stack
            spacing={{
              base: "8",
              md: "10",
            }}
            flex="2"
          >
            <Box>
              <Button as={NavLink} to="/">
                <BiArrowBack />
              </Button>
            </Box>
            <Heading fontSize="2xl" fontWeight="extrabold">
              Shopping Cart ({products.length} items)
            </Heading>

            <Stack spacing="6">
              {products?.map((item, index) => (
                <CartItem key={index} {...item} />
              ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary products={products} />
            <HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <Link as={NavLink} to="/" color={mode("blue.500", "blue.200")}>
                Continue shopping
              </Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
    </>
  );
};

export default Addcardproducts;
