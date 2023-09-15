import { combineReducers } from "redux";
import produitReducer from "./produit.reducer.js";
import categorieReducer from "./categorie.reducer.js";
import authReducer from "./auth.reducer.js";
import userReducer from "./user.reducer.js";
import searchReducer from "./search.reducer.js";
import orderReducer from "./order.reducer.js";

export default combineReducers({
  // REDUCERS
  produitReducer,
  categorieReducer,
  authReducer,
  userReducer,
  searchReducer,
  orderReducer,
});
