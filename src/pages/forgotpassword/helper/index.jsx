import axios from "axios";
import { api } from "../../../api";

export const forgotpassword = (data) => {
  return axios
    .post(`${api}/recover/password`, data)
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      return { error: error.response.data };
    });
};

export const resetpassword = (data) => {
  return axios
    .post(`${api}/resetPassword/password`, data)
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      return { error: error.response.data };
    });
};
