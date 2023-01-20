import axios from "axios";
import { api } from "../api";

export const authenticate = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("sign_in", JSON.stringify(data));
  }
};

export const setLocalUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const getLocalUser = () => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  }
};

export const isAuthenticate = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (typeof window !== "undefined") {
    if (localStorage.getItem("sign_in")) {
      return JSON.parse(localStorage.getItem("sign_in"));
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("sign_in");
    localStorage.removeItem("user");
    next();
  }
};

export const getuserfromtoken = () => {
  const token = `Bearer ${JSON.parse(localStorage.getItem("sign_in"))}`;
  return axios
    .get(`${api}/getuserfromtoken`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      return { error: error.response.data };
    });
};
