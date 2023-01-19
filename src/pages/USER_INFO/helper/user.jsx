import axios from "axios";
import { api } from "../../../api";

export const updateuser = (userId, token, data) => {
  return axios(`${api}/user/update/${userId}`, {
    method: "put",
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

export const updatepassword = (userId, token, data) => {
  return axios(`${api}/user/update/password/${userId}`, {
    method: "put",
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

export const resendvarification = (userId, token) => {
  return axios(`${api}/user/resend/verificationmail/${userId}`, {
    method: "post",
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
