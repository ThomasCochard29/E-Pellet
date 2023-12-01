import API from "./api";

export const GET_ORDER = "GET_ORDER";
export const GET_COUNT_ORDER_CONFIRMED = "GET_COUNT_ORDER_CONFIRMED";
export const GET_COUNT_ORDER_COMPLETED = "GET_COUNT_ORDER_COMPLETED";
export const GET_COUNT_ORDER_CANCEL = "GET_COUNT_ORDER_CANCEL";
export const GET_COUNT_ORDER_REFUND = "GET_COUNT_ORDER_REFUND";
export const ADD_ORDER = "ADD_ORDER";

export const getOrder = () => {
  return (dispatch) => {
    return API.get("/orders").then((res) => {
      const orders = res.data;
      const statuses = [];

      // Effectuez la boucle forEach pour extraire les statuts
      orders.forEach((order) => {
        const status = order?.orderStatus?.status_name;
        statuses.push(status);
      });

      // Dispatchez les données de la commande ainsi que les statuts
      dispatch({ type: GET_ORDER, payload: orders, statuses });
    });
  };
};

export const getCountOrderConfirmed = () => {
  return (dispatch) => {
    return API.get("/order/count/confirmed").then((res) =>
      dispatch({ type: GET_COUNT_ORDER_CONFIRMED, payload: res.data })
    );
  };
};

export const getCountOrderCompleted = () => {
  return (dispatch) => {
    return API.get("/order/count/completed").then((res) =>
      dispatch({ type: GET_COUNT_ORDER_COMPLETED, payload: res.data })
    );
  };
};

export const getCountOrderCancel = () => {
  return (dispatch) => {
    return API.get("/order/count/cancel").then((res) =>
      dispatch({ type: GET_COUNT_ORDER_CANCEL, payload: res.data })
    );
  };
};

export const getCountOrderRefund = () => {
  return (dispatch) => {
    return API.get("/order/count/refund").then((res) =>
      dispatch({ type: GET_COUNT_ORDER_REFUND, payload: res.data })
    );
  };
};

export const addOrder = (data) => {
  return (dispatch) => {
    return API.post("/order/add", data).then((res) =>
      dispatch({ type: ADD_ORDER, payload: data })
    );
  };
};
