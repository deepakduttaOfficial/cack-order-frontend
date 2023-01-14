import React from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { createcategory } from "../../helper/category";
import { useParams } from "react-router-dom";
import { isAuthenticate } from "../../../helper/auth";
import { reRenderCategory } from "../../../reducer/category/action";

const CreateCategory = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { adminId } = useParams();
  const token = isAuthenticate();
  const toast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { name: value };
    createcategory(data, adminId, token).then((response) => {
      setValue("");
      setLoading(false);
      if (!response.data) {
        return toast({
          position: "top-right",
          title: response.error.message || "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          position: "top-right",
          title: "The category has been successfully created.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        dispatch(reRenderCategory());
      }
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Flex justify={"center"}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Form a new category
          </Heading>
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            Ensure that the category is distinct
          </Text>

          <FormControl id="category" isRequired>
            <Input
              placeholder="Create a category"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              isLoading={loading}
              disabled={loading}
              loadingText={"Creating..."}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
};

export default CreateCategory;
