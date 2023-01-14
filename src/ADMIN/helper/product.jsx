import axios from "axios";
import { api } from "../../api";
import { getLocalUser } from "../../helper/auth";

export const createproduct = (data, adminId, token) => {
  if (getLocalUser()._id !== adminId) {
    return { error: "User not authenticate" };
  }

  if (!data) {
    return { error: "All field are requied" };
  }
  return axios(`${api}/product/create/${adminId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  })
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      return { error: error.response.data };
    });
};

export const removeproduct = (adminId, token, productId) => {
  if (getLocalUser()._id !== adminId) {
    return { error: "User not authenticate" };
  }
  return axios(`${api}/product/remove/${adminId}/${productId}`, {
    method: "delete",
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

export const updateproduct = (data, adminId, token, productId) => {
  if (getLocalUser()._id !== adminId) {
    return { error: "User not authenticate" };
  }
  return axios(`${api}/product/update/${adminId}/${productId}`, {
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
