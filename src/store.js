import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { getProd } from "./actions/produit.action.js";
import { getCateg } from "./actions/categorie.action";

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

store.dispatch(getProd());
store.dispatch(getCateg());
