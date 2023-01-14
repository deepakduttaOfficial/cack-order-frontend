import axios from "axios";
import { api } from "../../api";
import { getLocalUser } from "../../helper/auth";

export const getallusers = (adminId, token) => {
  return axios(`${api}/admin/dashboard/${adminId}/users`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      return { error: error.response.data };
    });
};
