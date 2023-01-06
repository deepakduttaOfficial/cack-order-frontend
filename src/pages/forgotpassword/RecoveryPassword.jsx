import {
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  HStack,
  Image,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetpassword } from "./helper";

const RecoveryPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    error: false,
    loading: false,
    success: false,
  });
  const { password, confirmPassword, loading } = values;

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      loading: false,
      error: false,
      success: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true, success: false });
    if (password !== confirmPassword) {
      setValues({ ...values, error: false, loading: false, success: false });
      return toast("password and confirm password not match", {
        type: "error",
        theme: "colored",
        autoClose: 2000,
      });
    }
    const data = {
      password,
      id: searchParams.get("id"),
      reset_password_token: searchParams.get("reset_password_token"),
    };
    resetpassword(data).then((response) => {
      console.log(response);
      if (!response.data) {
        setValues({ ...values, error: true, loading: false, success: false });
        return toast(response.error.message || "Something went wrong", {
          type: "error",
          theme: "colored",
          autoClose: 5000,
        });
      } else {
        setValues({ ...values, error: false, loading: false, success: true });
        toast(response.data.message, {
          type: "success",
          theme: "colored",
          autoClose: 5000,
        });
        navigate("/e/signin");
      }
    });
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      flexDir="column"
    >
      <HStack>
        <Image w={"30px"} src={logo} />
        <Heading>Misti</Heading>
      </HStack>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={6}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You&apos;ll get an email with a reset link
        </Text>

        <form onSubmit={handleSubmit}>
          <FormControl id="password" isRequired>
            <FormLabel>New password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                onChange={handleChange("password")}
                value={password}
                autoComplete="on"
                disabled={loading}
                autoFocus
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

          <FormControl id="confirmPassword" isRequired mt={3}>
            <FormLabel>Confirm password</FormLabel>
            <InputGroup>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                onChange={handleChange("confirmPassword")}
                value={confirmPassword}
                autoComplete="on"
                disabled={loading}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowConfirmPassword(
                      (showConfirmPassword) => !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Stack spacing={6} mt={4}>
            <CustomButton
              isLoading={loading}
              spinnerPlacement="end"
              loadingText="Submiting"
              type="submit"
            >
              Reset password
            </CustomButton>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};

export default RecoveryPassword;
