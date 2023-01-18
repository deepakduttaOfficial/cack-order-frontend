import axios from "axios";
import { api } from "../../../api";

export const getallproducts = ({ search, minPrice, maxPrice }) => {
  return axios
    .get(
      `${api}/product/get?${search && `search=${search}`}
      &${minPrice && `minPrice=${minPrice}`}
      &${maxPrice && `minPrice=${maxPrice}`}
      `
    )
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      return { error: error.response.data };
    });
};
