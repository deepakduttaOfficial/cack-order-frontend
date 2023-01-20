import axios from "axios";
import { api } from "../../../api";

let cancelToken;
export const getallproducts = (search = "", minPrice = "", maxPrice = "") => {
  if (cancelToken) {
    cancelToken.cancel("Canceling the previous req");
  }
  cancelToken = axios.CancelToken.source();
  return axios
    .get(
      `${api}/product/get?${search && `search=${search}`}
      &${maxPrice && `maxPrice=${maxPrice}`}
      &${minPrice && `minPrice=${minPrice}`}
      `,
      { cancelToken: cancelToken.token }
    )
    .then((response) => {
      return { data: response.data };
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log(error.message);
      } else return { error: error.response.data };
    });
};
