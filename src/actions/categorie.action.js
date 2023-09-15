import axios from "axios";

export const GET_CATEG = "GET_CATEG";
export const GET_COUNT_CATEG = "GET_COUNT_CATEG";
export const ADD_CATEG = "ADD_CATEG";
export const EDIT_CATEG = "EDIT_CATEG";
export const DELETE_CATEG = "DELETE_CATEG";

export const getCateg = () => {
  return (dispatch) => {
    return axios
      .get("http://localhost:5000/category")
      .then((res) => dispatch({ type: GET_CATEG, payload: res.data }));
  };
};

export const getCountCateg = () => {
  return (dispatch) => {
    return axios
      .get("http://localhost:5000/category/count")
      .then((res) => dispatch({ type: GET_COUNT_CATEG, payload: res.data }));
  };
};

export const addCateg = (data) => {
  return (dispatch) => {
    return axios
      .post("http://localhost:5000/category/add", data)
      .then((res) => dispatch({ type: ADD_CATEG, payload: data }));
  };
};

export const editCateg = (data) => {
  return (dispatch) => {
    return axios
      .put(`http://localhost:5000/category/update/${data.id_categ}`, data)
      .then((res) => dispatch({ type: EDIT_CATEG, payload: data }));
  };
};

export const deleteCateg = (id_categ) => {
  return (dispatch) => {
    return axios
      .delete(`http://localhost:5000/category/delete/${id_categ}`)
      .then((res) => dispatch({ type: DELETE_CATEG, payload: id_categ }));
  };
};
