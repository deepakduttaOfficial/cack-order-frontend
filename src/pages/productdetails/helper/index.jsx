import axios from "axios";
import { api } from "../../../api";

export const getsingleproduct = (id) => {
  return axios
    .get(`${api}/product/get/${id}`)
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      return { error: error.response.data };
    });
};
