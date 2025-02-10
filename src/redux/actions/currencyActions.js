// export const currency = (data) => {
//   return {
//     type: "Currency",
//     payload: data,
//   };
// };
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

import axios from "axios";

export const fetchCurrency = () => {
  return async (dispach) => {
    try {
      const response = await axios(`${baseURL}/api/currency`);
      const currencyData = response.data;
      dispach({
        type: "FETCH_CURRENCY_SUCCESS",
        payload: currencyData,
      });
    } catch (error) {
      dispach({
        type: "FETCH_CURRENY_FAILURE",
        payload: error.message,
      });
    }
  };
};
