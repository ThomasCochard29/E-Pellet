import {
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  REGISTER_USER,
} from "../actions/auth.action.js";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case REGISTER_USER:
      return [
        action.payload,
        {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          isAuthenticated: true,
        },
      ];
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false, // Marquez l'utilisateur comme déconnecté
      };
    default:
      return state;
  }
}
