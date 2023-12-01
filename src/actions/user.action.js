import API from "./api";

export const GET_COUNT_USER = "GET_COUNT_USER";

export const getCountUser = () => {
  return (dispatch) => {
    return API.get("/client/count").then((res) =>
      dispatch({ type: GET_COUNT_USER, payload: res.data })
    );
  };
};
