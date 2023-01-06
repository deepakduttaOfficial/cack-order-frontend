import axios from "axios";
import { api } from "../../../api";

export const getallproducts = () => {
  return axios
    .get(`${api}/product/get`)
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      return { error: error.response.data };
    });
};
