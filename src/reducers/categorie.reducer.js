import {
  ADD_CATEG,
  DELETE_CATEG,
  EDIT_CATEG,
  GET_CATEG,
  GET_COUNT_CATEG,
} from "../actions/categorie.action.js";

const initialState = {};

export default function categorieReducer(state = initialState, action) {
  // Switch
  switch (action.type) {
    case GET_CATEG:
      return action.payload;
    case GET_COUNT_CATEG:
      return action.payload;
    case ADD_CATEG:
      return [action.payload, ...state];
    case EDIT_CATEG:
      return state.map((categ) => {
        if (categ.id_categ === action.payload.id_categ) {
          return {
            ...categ,
            content: action.payload.content,
          };
        } else return categ;
      });
    case DELETE_CATEG:
      return state.filter((categ) => categ.id_categ !== action.payload);
    default:
      return state;
  }
}
