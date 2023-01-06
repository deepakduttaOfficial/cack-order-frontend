import axios from "axios";
import { api } from "../../../api";

export const signup = (data) => {
  return axios
    .post(`${api}/signup`, data)
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      return { error: error.response.data };
    });
};
