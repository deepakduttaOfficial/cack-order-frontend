import axios from "axios";
import { api } from "../../../api";

export const getuserorders = (userId, token) => {
  return axios(`${api}/order/get/${userId}`, {
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
