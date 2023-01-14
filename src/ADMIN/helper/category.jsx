import axios from "axios";
import { api } from "../../api";
import { getLocalUser } from "../../helper/auth";

export const createcategory = (data, adminId, token) => {
  if (getLocalUser()._id !== adminId) {
    return { error: "User not authenticate" };
  }

  return axios(`${api}/category/create/${adminId}`, {
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

export const getonecategory = (categoryId) => {
  return axios
    .get(`${api}/category/get/${categoryId}`)
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      return { error: error.response.data };
    });
};

export const updatecategory = (data, adminId, token, categoryId) => {
  if (getLocalUser()._id !== adminId) {
    return { error: "User not authenticate" };
  }
  return axios(`${api}/category/update/${adminId}/${categoryId}`, {
    method: "put",
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

export const removecategory = (adminId, token, categoryId) => {
  if (getLocalUser()._id !== adminId) {
    return { error: "User not authenticate" };
  }
  return axios(`${api}/category/remove/${adminId}/${categoryId}`, {
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
