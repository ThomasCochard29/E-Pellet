import API from "./api";

export const SEARCH_REQUEST = "SEARCH_REQUEST";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAILURE = "SEARCH_FAILURE";

export const searchRequest = () => ({
  type: SEARCH_REQUEST,
});

export const searchSuccess = (results) => ({
  type: SEARCH_SUCCESS,
  payload: results,
});

export const searchFailure = (error) => ({
  type: SEARCH_FAILURE,
  payload: error,
});

export const searchAction = (searchTerm) => {
  return async (dispatch) => {
    dispatch(searchRequest());
    try {
      const response = await API.get(`/search?term=${searchTerm}`);
      const results = response.data;
      dispatch(searchSuccess(results));
      return results; // Retournez les résultats de la recherche
    } catch (error) {
      dispatch(searchFailure(error.message));
      throw error;
    }
  };
};
export const searchActionCategorie = (searchTerm) => {
  return async (dispatch) => {
    dispatch(searchRequest());
    try {
      const response = await API.get(`/search/categorie?term=${searchTerm}`);
      const results = response.data;
      dispatch(searchSuccess(results));
      return results; // Retournez les résultats de la recherche
    } catch (error) {
      dispatch(searchFailure(error.message));
      throw error;
    }
  };
};
