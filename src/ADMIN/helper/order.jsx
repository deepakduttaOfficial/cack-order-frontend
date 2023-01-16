import axios from "axios";
import { api } from "../../api";

export const getallorders = (adminId, token) => {
  return axios(`${api}/admin/get/${adminId}/orders`, {
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
