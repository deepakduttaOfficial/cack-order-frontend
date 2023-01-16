import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Spinner,
  Center,
  HStack,
  IconButton,
  Input,
  useToast,
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
      <Center>
        {loading ? (
          <Spinner thickness="4px" speed="0.65s" color="blue.500" size="xl" />
        ) : (
          <Avatar size="xl" src={user?.photo?.secure_url}>
            <AvatarBadge
              as={IconButton}
              size="sm"
              display
              rounded="full"
              top="-10px"
              colorScheme="red"
              aria-label="remove Image"
              icon={<SmallCloseIcon />}
            />
          </Avatar>
        )}
      </Center>
      <Center w="full">
        <Input type={"file"} onChange={handleChange} disabled={loading} />
      </Center>
    </HStack>
  );
};

export default ImageHander;
