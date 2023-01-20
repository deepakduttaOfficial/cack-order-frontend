import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Button, Heading, HStack, Image, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import logo from "../../assets/logo.png";
import { verifyaccount } from "./helper";
import { authenticate, setLocalUser, signout } from "../../helper/auth";

const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [animations, setAnimations] = useState({
    loading: false,
    success: false,
    error: false,
  });
  const { loading, success, error } = animations;

  const handleVarify = () => {
    setAnimations({ ...animations, loading: true });
    const data = {
      id: searchParams.get("id"),
      varify_email_token: searchParams.get("varify_email_token"),
    };
    verifyaccount(data).then((response) => {
      if (!response.data) {
        setAnimations({
          ...animations,
          loading: false,
          error: response.error.message,
        });
      } else {
        signout(() => {
          setAnimations({
            ...animations,
            loading: false,
            success: true,
          });
          setTimeout(() => {
            authenticate(response.data?.sign_in);
            setLocalUser(response.data?.user);
            navigate("/");
            window.location.reload();
          }, 2000);
        });
      }
    });
  };

  return (
    <Box textAlign="center" py={10} px={6}>
      <HStack justifyContent={"center"}>
        <Image src={logo} w={"10"} />
        <Heading>Misti</Heading>
      </HStack>
      <Box mt={["10", "20"]}>
        {success && <CheckCircleIcon boxSize={"50px"} color={"green.500"} />}

        <Heading as="h2" size="xl" mt={6} mb={2}>
          {success && (
            <>
              Congratulations, your account has been successfully verified.{" "}
              <br />
              Redirecing...
            </>
          )}
          {error && (
            <Text color={"red.300"}>{error || "Something went wrong"}</Text>
          )}

          {!(success || error) && "Verify your account by clicking here"}
        </Heading>
        {!(success || error) && (
          <Button
            colorScheme={"green"}
            onClick={handleVarify}
            isLoading={loading}
          >
            Verify
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default VerifyAccount;
