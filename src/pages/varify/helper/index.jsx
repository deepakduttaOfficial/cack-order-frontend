import axios from "axios";
import { api } from "../../../api";

export const verifyaccount = (data) => {
  return axios
    .post(`${api}/user/verifyaccount`, data)
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      return { error: error.response.data };
    });
};
