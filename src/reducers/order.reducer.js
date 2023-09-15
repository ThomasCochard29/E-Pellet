import {
  ADD_ORDER,
  GET_COUNT_ORDER_CANCEL,
  GET_COUNT_ORDER_COMPLETED,
  GET_COUNT_ORDER_CONFIRMED,
  GET_COUNT_ORDER_REFUND,
  GET_ORDER,
} from "../actions/order.action";

const initialState = {};

export default function orderReducer(state = initialState, action) {
  // Switch
  switch (action.type) {
    case GET_ORDER:
      return action.payload;
    case GET_COUNT_ORDER_CONFIRMED:
      return action.payload;
    case GET_COUNT_ORDER_COMPLETED:
      return action.payload;
    case GET_COUNT_ORDER_CANCEL:
      return action.payload;
    case GET_COUNT_ORDER_REFUND:
      return action.payload;
    case ADD_ORDER:
      return [action.payload, ...state];
    default:
      return state;
  }
}
