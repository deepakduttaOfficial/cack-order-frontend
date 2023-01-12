import axios from "axios";
import { api } from "../api";

export const getcategory = () => {
  return axios
    .get(`${api}/category/get`)
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      return { error: error.response.data };
    });
};
