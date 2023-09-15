import { GET_COUNT_USER } from "../actions/user.action";

const initialState = {};

export default function userReducer(state = initialState, action) {
  // Switch
  switch (action.type) {
    case GET_COUNT_USER:
      return action.payload;
    default:
      return state;
  }
}
