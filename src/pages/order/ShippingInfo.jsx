import React, { useState } from "react";
import {
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Container,
  PinInput,
  PinInputField,
  HStack,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addShipingInfo } from "../../reducer/order/action";

const ShippingInfo = ({ setStep }) => {
  const { createOrder } = useSelector((state) => state.ORDER);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    state: createOrder?.shippingInfo?.state || "",
    city: createOrder?.shippingInfo?.city || "",
    postalCode: createOrder?.shippingInfo?.postalCode || "",
    phoneNo: createOrder?.shippingInfo?.phoneNo || "",
    address: createOrder?.shippingInfo?.address || "",
  });

  const { state, city, postalCode, phoneNo, address } = values;

  const disabled =
    state.length === 0 ||
    city.length === 0 ||
    postalCode.length < 6 ||
    phoneNo.length !== 10 ||
    address.length < 10;

  const handleChange = (name) => (e) => {
    let value = name === "postalCode" ? e : e.target.value;
    setValues({ ...values, [name]: value });
  };

  return (
    <Container>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Shipping Info
      </Heading>
      <Flex mt="5">
        <FormControl mr="5%" isRequired>
          <FormLabel fontWeight={"normal"}>State</FormLabel>
          <Input
            placeholder="Enter your state"
            onChange={handleChange("state")}
            value={state}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontWeight={"normal"}>City</FormLabel>
          <Input
            placeholder="Enter your City"
            onChange={handleChange("city")}
            value={city}
          />
        </FormControl>
      </Flex>

      <Flex mt="5">
        <FormControl mr="5%" isRequired>
          <FormLabel fontWeight={"normal"}>Postal code</FormLabel>
          <HStack>
            <PinInput value={postalCode} onChange={handleChange("postalCode")}>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontWeight={"normal"}>Country</FormLabel>
          <Input placeholder="Enter your City" value={"India"} disabled />
        </FormControl>
      </Flex>

      <FormControl mt="5" isRequired>
        <FormLabel fontWeight={"normal"}>Phone number</FormLabel>
        <Input
          type="number"
          placeholder="Your number"
          onChange={handleChange("phoneNo")}
          value={phoneNo}
        />
      </FormControl>

      <FormControl mt="5" isRequired>
        <FormLabel fontWeight={"normal"}>Your address</FormLabel>
        <Textarea
          placeholder="Enter your full address"
          onChange={handleChange("address")}
          value={address}
        />
      </FormControl>
      <Flex w={"full"} mt="5">
        <Button
          w={"full"}
          isDisabled={disabled}
          onClick={() => {
            setStep(2);
            dispatch(addShipingInfo(values));
          }}
          colorScheme="blue"
          variant="outline"
        >
          Next
        </Button>
      </Flex>
    </Container>
  );
};

export default ShippingInfo;
