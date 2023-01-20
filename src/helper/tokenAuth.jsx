import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getuserfromtoken,
  isAuthenticate,
  setLocalUser,
  signout,
} from "./auth";

export default () => {
  const navigate = useNavigate();
  const toast = useToast();
  return useEffect(() => {
    if (isAuthenticate()) {
      const token = isAuthenticate();
      getuserfromtoken(token).then((response) => {
        if (response.error) {
          toast({
            title: "Token has been expired",
            position: "top-right",
            duration: 9000,
            status: "error",
            isClosable: true,
          });
          signout(() => {
            navigate("/e/signin");
          });
        } else {
          setLocalUser(response.data.user);
        }
      });
    }
  }, [navigate]);
};
