import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
} from "../actions/search.action.js";

const initialState = {
  loading: false,
  results: [],
  error: null,
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload,
        error: null,
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        results: [],
        error: action.payload,
      };
    default:
      return state;
  }
}
