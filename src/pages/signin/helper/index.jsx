import axios from "axios";
import { api } from "../../../api";

export const signin = (data) => {
  return axios
    .post(`${api}/signin`, data)
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      return { error: error.response.data };
    });
};
