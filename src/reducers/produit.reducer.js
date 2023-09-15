import {
  ADD_PROD,
  DELETE_PROD,
  EDIT_PROD,
  GET_PROD,
  GET_COUNT_PROD,
} from "../actions/produit.action.js";

const initialState = {};

export default function produitReducer(state = initialState, action) {
  // Switch
  switch (action.type) {
    case GET_PROD:
      return action.payload;
    case GET_COUNT_PROD:
      return action.payload;
    case ADD_PROD:
      return [action.payload, ...state];
    case EDIT_PROD:
      return state.map((prod) => {
        if (prod.id_prod === action.payload.id_prod) {
          return {
            ...prod,
            content: action.payload.content,
          };
        } else return prod;
      });
    case DELETE_PROD:
      return state.filter((prod) => prod.id_prod !== action.payload);
    default:
      return state;
  }
}
