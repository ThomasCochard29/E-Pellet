import {
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  REGISTER_USER,
} from "../actions/auth.action.js";

const initialState = {
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
  name: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.roleUser,
        isAuthenticated: true,
        name: action.payload.nameUser,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        role: null,
        name: null,
        error: action.payload,
      };
    case REGISTER_USER:
      return [
        action.payload,
        {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          role: null,
          name: null,
          isAuthenticated: true,
        },
      ];
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        token: null,
        role: null,
        name: null,
        isAuthenticated: false, // Marquez l'utilisateur comme déconnecté
      };
    default:
      return state;
  }
}
