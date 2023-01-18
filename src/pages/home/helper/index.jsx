import axios from "axios";
import { api } from "../../../api";

export const getallproducts = (search) => {
  return axios
    .get(`${api}/product/get?${search && `search=${search}`}`)
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      return { error: error.response.data };
    });
};
