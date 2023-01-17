import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { isAuthenticate, setLocalUser } from "../../../helper/auth";
import Sidebar from "../components/Sidebar";
import { updatepassword } from "../helper/user";

const PasswordUpdate = () => {
  const token = isAuthenticate();
  const { userId } = useParams();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { oldPassword, newPassword, confirmPassword } = values;

  const disabled =
    newPassword.length < 4 ||
    oldPassword.length < 4 ||
    newPassword !== confirmPassword;

  const handleChange = (name) => (e) => {
    setLoading(false);
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { old_password: oldPassword, new_password: newPassword };
    updatepassword(userId, token, data).then((response) => {
      setLoading(false);
      setValues({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
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
          title: "Your password has been successfully updated.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <Sidebar>
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
              Update your password
            </Heading>
            <Text
              fontSize={{ base: "sm", sm: "md" }}
              color={useColorModeValue("gray.800", "gray.400")}
              mb="5"
            >
              The minimum length requirement for a password is 4 characters.
            </Text>
            <FormControl isRequired>
              <FormLabel>Old password</FormLabel>
              <Input
                _placeholder={{ color: "gray.500" }}
                type="password"
                value={oldPassword}
                onChange={handleChange("oldPassword")}
                autoComplete="on"
                autoFocus
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>New password</FormLabel>
              <Input
                _placeholder={{ color: "gray.500" }}
                type="password"
                value={newPassword}
                onChange={handleChange("newPassword")}
                autoComplete="on"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                _placeholder={{ color: "gray.500" }}
                type="password"
                value={confirmPassword}
                onChange={handleChange("confirmPassword")}
                autoComplete="on"
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
                disabled={loading || disabled}
                loadingText={"Creating..."}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </form>
    </Sidebar>
  );
};

export default PasswordUpdate;
