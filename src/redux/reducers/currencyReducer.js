const initialState = {
  currencyData: null,
};
export default function currencyReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_CURRENCY_SUCCESS":
      return {
        ...state,
        currencyData: action.payload,
        error: null,
      };
    case "FETCH_CURRENCY_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
