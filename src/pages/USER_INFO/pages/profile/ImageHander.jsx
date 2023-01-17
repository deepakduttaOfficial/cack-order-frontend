import { EditIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Spinner,
  Center,
  HStack,
  IconButton,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  getLocalUser,
  isAuthenticate,
  setLocalUser,
} from "../../../../helper/auth";
import { updateuser } from "../../helper/user";

const ImageHander = () => {
  const [loading, setLoading] = useState(false);
  const token = isAuthenticate();
  const { userId } = useParams();
  const toast = useToast();
  const user = getLocalUser();

  const handleChange = (e) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("photo", e.target.files[0]);
    updateuser(userId, token, formData).then((response) => {
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
          title: "successfully updated.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setLocalUser(response.data?.user);
        window.location.reload();
      }
    });
  };
  return (
    <HStack w={"fit-content"} mb={10}>
      <VStack w="full">
        <Center>
          {loading ? (
            <Spinner thickness="4px" speed="0.65s" color="blue.500" size="xl" />
          ) : (
            <Avatar size="xl" src={user?.photo?.secure_url}>
              <AvatarBadge size="sm" display rounded="full" top="-10px" />
            </Avatar>
          )}
        </Center>
        <HStack position={"relative"} justifyContent="center" w={"5"} h="5">
          <EditIcon />
          <Input
            position={"absolute"}
            type={"file"}
            onChange={handleChange}
            disabled={loading}
            w={4}
            h={5}
            zIndex={"overlay"}
            opacity={0}
          />
        </HStack>
      </VStack>
    </HStack>
  );
};

export default ImageHander;
