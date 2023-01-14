import axios from "axios";
import { api } from "../../../api";
import { getLocalUser } from "../../../helper/auth";

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
