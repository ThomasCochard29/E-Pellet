import API from "./api";

export const GET_PROD = "GET_PROD";
export const GET_COUNT_PROD = "GET_COUNT_PROD";
export const ADD_PROD = "ADD_PROD";
export const EDIT_PROD = "EDIT_PROD";
export const DELETE_PROD = "DELETE_PROD";

export const getProd = () => {
  return (dispatch) => {
    return API.get("/produits")
      .then((res) => dispatch({ type: GET_PROD, payload: res.data }));
  };
};

export const getCountProd = () => {
  return (dispatch) => {
    return API.get("/produit/count")
      .then((res) => dispatch({ type: GET_COUNT_PROD, payload: res.data }));
  };
};

export const addProd = (data) => {
  return (dispatch) => {
    return API.post("/produit/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => dispatch({ type: ADD_PROD, payload: data }));
  };
};

export const editProd = (data, id_prod) => {
  return (dispatch) => {
    return API.put(`/produit/update/${id_prod}`, data)
      .then((res) => dispatch({ type: EDIT_PROD, payload: data }));
  };
};

export const deleteProd = (id_prod) => {
  return (dispatch) => {
    return API.delete(`/produit/delete/${id_prod}`)
      .then((res) => dispatch({ type: DELETE_PROD, payload: id_prod }));
  };
};
