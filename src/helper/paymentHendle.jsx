import axios from "axios";
import { api } from "../api";

export const createpayment = (data, userId, token) => {
  return axios(`${api}/order/create/payment/${userId}`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  })
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      return { error: error.response.data };
    });
};

export const createorder = (data, userId, token) => {
  return axios(`${api}/order/create/${userId}`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  })
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      return { error: error.response.data };
    });
};
