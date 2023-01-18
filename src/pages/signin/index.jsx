import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import { signin } from "./helper";
import { authenticate, isAuthenticate, setLocalUser } from "../../helper/auth";

export default function Signin() {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
    error: false,
    success: false,
  });
  const { email, password, loading } = values;

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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false, success: false });

    signin({ email, password }).then((response) => {
      if (!response.data) {
        setValues({ ...values, loading: false, error: true, success: false });
        return toast({
          title: response.error.message || "Something went wrong",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        setValues({ ...values, loading: false, error: false, success: true });
        toast({
          title: "Successfully sign in",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        authenticate(response.data?.sign_in);
        setLocalUser(response.data?.user);
        navigate("/");
        // window.location.reload();
      }
    });
  };

  const disabled =
    loading ||
    email.length === 0 ||
    password.length === 0 ||
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

  return (
    <Flex
      minH={"100vh"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      {isAuthenticate() && <Navigate to={"/"} replace />}
      <Stack spacing={8} mx={"auto"} w="lg" py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
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
              </FormControl>
              <Stack spacing={5}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox disabled={loading}>Remember me</Checkbox>
                  <Link
                    as={NavLink}
                    to="/account/forgotpassword"
                    color={"blue.400"}
                  >
                    Forgot password?
                  </Link>
                </Stack>
                <CustomButton
                  type="submit"
                  isLoading={loading}
                  spinnerPlacement="end"
                  loadingText="Submiting"
                  disabled={disabled}
                >
                  Sigin in
                </CustomButton>
              </Stack>
              <Text>
                Don't have any account?{" "}
                <Link as={NavLink} to="/e/signup" color={"blue.400"}>
                  Sign up
                </Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
