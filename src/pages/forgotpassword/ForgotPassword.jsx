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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { forgotpassword } from "./helper";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
    error: false,
    loading: false,
    success: false,
  });
  const { email, success, error, loading } = values;
  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true, success: false });

    forgotpassword({ email }).then((response) => {
      if (!response.data) {
        setValues({
          email: "",
          loading: false,
          error: response.error.message || "Something went wrong",
          success: false,
        });
      } else {
        setValues({
          email: "",
          loading: false,
          error: false,
          success: true,
        });
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
        {success && (
          <Alert status="success" variant="subtle" rounded={"md"}>
            <AlertIcon />
            Chack you mail and reset your password
          </Alert>
        )}
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl id="email">
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              autoFocus
              value={email}
              onChange={(e) => {
                setValues({ ...values, email: e.target.value });
              }}
              required
            />
          </FormControl>
          <Stack spacing={6} mt={4}>
            <CustomButton
              isLoading={loading}
              spinnerPlacement="end"
              loadingText="Submiting"
              type="submit"
            >
              Request Reset
            </CustomButton>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
};
export default ForgotPassword;
