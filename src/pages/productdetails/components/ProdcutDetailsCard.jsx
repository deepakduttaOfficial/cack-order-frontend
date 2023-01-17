import {
  Badge,
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  Link,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CustomButton from "../../../components/CustomButton";
import { FaShippingFast } from "react-icons/fa";
import { Ri24HoursLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { addcard, getaddcard } from "../../../helper/addCard";
import { useNavigate } from "react-router-dom";
import { updateAddCard } from "../../../reducer/UI/action";

const ProdcutDetailsCard = () => {
  const [showMore, setShowMore] = useState(false);
  const [quan, setQuan] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeColor = useColorModeValue("gray.500", "gray.400");
  const { singleproduct } = useSelector((state) => state.PRODUCT);
  const handleClick = (singleproduct) => {
    const isAdded = getaddcard().some((item) => {
      if (item._id === singleproduct._id) {
        return true;
      } else {
        return false;
      }
    });
    if (!isAdded) {
      singleproduct.quantity = quan;
      addcard(singleproduct);
      dispatch(updateAddCard());
      navigate("/addcard");
    } else {
      navigate("/addcard");
    }
  };

  const description = singleproduct?.description;

  return (
    <VStack
      flexDir="column"
      alignItems="start"
      justifyContent="start"
      spacing={"3"}
      px={{ base: "0", md: "10" }}
      w={{ base: "full", md: "xl" }}
      py={"10"}
      mt={{ base: "0", md: "5" }}
    >
      <Box>
        <Badge variant="subtle" colorScheme="green">
          In Stock
        </Badge>
      </Box>
      <Heading>{singleproduct?.name}</Heading>

      <HStack>
        <Text fontSize="lg" fontWeight="semibold" color={themeColor}>
          ${singleproduct?.price?.toFixed(2)}
        </Text>
      </HStack>
      <Text fontSize="md" fontWeight="normal" color={themeColor}>
        {showMore ? `${description}` : `${description?.substring(0, 200)}`}
        <Link
          color={useColorModeValue("black", "white")}
          onClick={() => {
            setShowMore((preVal) => !preVal);
          }}
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
        >
          {description && description.length > 200
            ? showMore
              ? "...show less"
              : "...show more"
            : ""}
        </Link>
      </Text>
      <VStack>
        <HStack>
          <FaShippingFast />
          <Text ml="2">Free shipping + returns</Text>
        </HStack>
        <HStack>
          <Ri24HoursLine />
          <Text ml="2">We’re here for you 24/7</Text>
        </HStack>
      </VStack>
      <HStack
        border={"1px"}
        rounded="md"
        borderColor={useColorModeValue("gray.200", "gray.600")}
        w={"44"}
        justifyContent="space-between"
        p={"1"}
        bg={useColorModeValue("white", "transparent")}
      >
        <Button
          disabled={quan === 1}
          onClick={() => {
            if (quan === 1) {
              return;
            }
            setQuan((preVal) => preVal - 1);
          }}
        >
          -
        </Button>
        <Text>{quan}</Text>
        <Button
          onClick={() => {
            setQuan((preVal) => preVal + 1);
          }}
        >
          +
        </Button>
      </HStack>
      <Box w={"full"}>
        <CustomButton
          mt="5"
          w={{ base: "full", md: "auto" }}
          onClick={() => {
            handleClick(singleproduct);
          }}
        >
          Add to card
        </CustomButton>
      </Box>
    </VStack>
  );
};
export default ProdcutDetailsCard;
