import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { updateuser } from "../../helper/user";
import { isAuthenticate, setLocalUser } from "../../../../helper/auth";
import { useParams } from "react-router-dom";

const EditInput = ({
  label,
  editable = true,
  loading,
  setLoading,
  values,
  ...rest
}) => {
  const [disVal, setDisVal] = useState(true);
  const token = isAuthenticate();
  const { userId } = useParams();
  const toast = useToast();

  const updateUser = () => {
    setDisVal(true);
    setLoading(true);
    const data = { name: values };
    updateuser(userId, token, data).then((response) => {
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
      }
    });
  };

  return (
    <FormControl>
      <FormLabel>
        {label}
        {editable && (
          <Link
            ml={5}
            color={"blue.400"}
            onClick={() => {
              !loading && setDisVal(false);
            }}
          >
            Edit
          </Link>
        )}
      </FormLabel>
      <HStack>
        <Input disabled={disVal} {...rest} />
        <Button
          colorScheme={"blue"}
          disabled={disVal || loading}
          onClick={updateUser}
          isLoading={loading}
        >
          Save
        </Button>

        {!disVal && (
          <Button
            colorScheme={"red"}
            onClick={() => {
              setDisVal(true);
            }}
          >
            Cencel
          </Button>
        )}
      </HStack>
    </FormControl>
  );
};

export default EditInput;
