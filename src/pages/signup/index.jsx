import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { isAuthenticate } from "../../helper/auth";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Text,
  FormHelperText,
  useToast,
  position,
} from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import { signup } from "./helper";

const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
    error: false,
    success: false,
  });
  const { name, email, password, loading } = values;

  // Input Changer
  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      loading: false,
      error: false,
      success: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false, success: false });

    signup({ name, email, password }).then((response) => {
      if (!response.data) {
        setValues({ ...values, loading: false, error: true, success: false });
        return toast({
          title: response.error.message || "Something went wrong",
          status: "error",
          position: "top-right",
          duration: 9000,
          isClosable: true,
        });
      } else {
        setValues({ ...values, loading: false, error: false, success: true });
        toast({
          title: "Please confirm your email to continue",
          status: "success",
          position: "top-right",
          duration: 9000,
          isClosable: true,
        });

        navigate("/e/signin");
      }
    });
  };

  const disabled =
    loading ||
    name.length === 0 ||
    email.length === 0 ||
    password.length < 4 ||
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

  return (
    <Flex
      minH={"100vh"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      {isAuthenticate() && <Navigate to="/" />}
      <Stack spacing={8} mx={"auto"} w="lg" py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Create an account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Your name</FormLabel>
                <Input
                  type="name"
                  onChange={handleChange("name")}
                  value={name}
                  disabled={loading}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={handleChange("email")}
                  value={email}
                  disabled={loading}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange("password")}
                    value={password}
                    autoComplete="on"
                    disabled={loading}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>
                  The minimum required length for a password is 4 characters.
                </FormHelperText>
              </FormControl>
              <Stack spacing={5}>
                <CustomButton
                  type="submit"
                  isLoading={loading}
                  loadingText={"Submiting"}
                  spinnerPlacement="end"
                  disabled={disabled}
                >
                  Sign up
                </CustomButton>
              </Stack>
              <Text>
                Alreadt have an account?{" "}
                <Link as={NavLink} to="/e/signin" color={"blue.400"}>
                  Sign in
                </Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};
export default Signup;
