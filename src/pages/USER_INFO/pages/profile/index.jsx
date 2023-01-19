import React from "react";
import Sidebar from "../../components/Sidebar";
import {
  useColorModeValue,
  Container,
  VStack,
  Badge,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import EditInput from "./EditInput";
import ImageHander from "./ImageHander";
import { getLocalUser, isAuthenticate, signout } from "../../../../helper/auth";
import { useNavigate, useParams } from "react-router-dom";
import { resendvarification } from "../../helper/user";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [varifyLoading, setVarifyLoading] = useState(false);
  const [timeValid, setTimeValid] = useState(false);
  const navigate = useNavigate();

  const toast = useToast();

  const { userId } = useParams();
  const token = isAuthenticate();
  const user = getLocalUser();
  const [name, setName] = useState(user?.name);

  const handleSendVarification = () => {
    setVarifyLoading(true);
    setTimeValid(true);

    resendvarification(userId, token).then((response) => {
      setVarifyLoading(false);
      setTimeout(() => {
        setTimeValid(false);
      }, 10000);
      if (!response.data) {
        return toast({
          title: response.error?.message || "Something went wrong",
          duration: 9000,
          position: "top-right",
          status: "error",
          isClosable: true,
        });
      } else {
        signout(() => {
          toast({
            title: response.data?.message || "Check you mail",
            duration: 9000,
            position: "top-right",
            status: "success",
            isClosable: true,
          });
          navigate("/");
        });
      }
    });
  };

  const disabled = varifyLoading || timeValid;

  return (
    <Sidebar>
      <Container
        bgColor={useColorModeValue("white", "gray.800")}
        py={10}
        px={5}
      >
        <form>
          <VStack>
            <ImageHander />
            {user.isVerified ? (
              <Badge colorScheme={"green"}>VARIFIED</Badge>
            ) : (
              <Button
                colorScheme={"green"}
                onClick={handleSendVarification}
                isLoading={varifyLoading}
                disabled={disabled}
              >
                Resend Varify token
              </Button>
            )}

            <EditInput
              label={"Name: "}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              loading={loading}
              setLoading={setLoading}
              values={name}
            />
            <EditInput label={"Email: "} editable={false} value={user?.email} />
          </VStack>
        </form>
      </Container>
    </Sidebar>
  );
};

export default Profile;
