import axios from "axios";

export const GET_COUNT_USER = "GET_COUNT_USER";

export const getCountUser = () => {
  return (dispatch) => {
    return axios
      .get("http://localhost:5000/client/count")
      .then((res) => dispatch({ type: GET_COUNT_USER, payload: res.data }));
  };
};
