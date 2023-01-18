import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getuserfromtoken,
  isAuthenticate,
  setLocalUser,
  signout,
} from "./auth";

export default () => {
  const navigate = useNavigate();
  return useEffect(() => {
    if (isAuthenticate()) {
      const token = isAuthenticate();
      getuserfromtoken(token).then((response) => {
        if (response.error) {
          toast("Token has been expired", {
            type: "error",
            theme: "colored",
            autoClose: 2000,
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
