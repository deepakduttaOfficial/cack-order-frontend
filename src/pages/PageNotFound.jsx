import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import CustomButton from "../components/CustomButton";

const PageNotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent={"center"}
      alignItems="center"
      h={"100vh"}
    >
      <Box my={"auto"} textAlign="center">
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, red.400,pink.400)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={"gray.500"} mb={6}>
          The page you're looking for does not seem to exist
        </Text>

        <CustomButton as={NavLink} to={"/"}>
          Go to Home
        </CustomButton>
      </Box>
    </Box>
  );
};
export default PageNotFound;
