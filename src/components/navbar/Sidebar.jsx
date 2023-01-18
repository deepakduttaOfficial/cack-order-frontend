import React from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  useColorModeValue,
  Stack,
  FormLabel,
  Select,
  Textarea,
  HStack,
  FormControl,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { filterProduct } from "../../reducer/product/action";
import { useState } from "react";
import { useEffect } from "react";
import { getcategory } from "../../helper/category";
import { CloseIcon } from "@chakra-ui/icons";

const Sidebar = ({ onClose, ...rest }) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getcategory().then((response) => {
      if (!response.data) {
        setCategories([]);
      } else {
        setCategories(response.data?.categories);
      }
    });
  }, []);

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.400", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      pt={"20"}
      px={"3"}
      position="relative"
      {...rest}
    >
      <IconButton
        size={"md"}
        icon={<CloseIcon />}
        aria-label={"Open Menu"}
        display={{ md: "none" }}
        onClick={onClose}
        pos="absolute"
        right={"5"}
        top={"5"}
      />
      <Stack spacing="24px">
        <HStack>
          <Select
            defaultValue="Min"
            onChange={(e) => {
              dispatch(filterProduct({ minPrice: e.target.value }));
            }}
          >
            <option value={""}>Min</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
          </Select>
          <Select
            defaultValue="Max"
            onChange={(e) => {
              dispatch(filterProduct({ maxPrice: e.target.value }));
            }}
          >
            <option value="">Max</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
          </Select>
        </HStack>

        <Box>
          <FormLabel>Select Category</FormLabel>
          <Select defaultValue="">
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Select>
        </Box>

        <FormControl>
          <FormLabel disabled>Your Feedback</FormLabel>
          <Textarea disabled />
          <Button mt={"3"} colorScheme="blue" w={"full"} disabled>
            Feedback
          </Button>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default Sidebar;
