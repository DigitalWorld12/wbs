import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";

export const refreshAuth = () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL; // Add this line here

  return async (dispatch) => {
    try {
      const config = {
        headers: {
          Authorization:
            "Bearer " +
            reactLocalStorage?.getObject("loginAuth")?.authorisation?.token,
        },
      };

      const response = await axios.post(
        `${baseURL}/api/auth/refresh`,
        // "https://dev7.sidat.digital/wbs/api/auth/refresh",
        {},
        config
      );
      const authData = response.data;
      // handle the response as needed
      dispatch({
        type: "REFRESH_AUTH_SUCCESS",
        payload: authData, // include the necessary data from the response
      });
    } catch (error) {
      dispatch({
        type: "REFRESH_AUTH_FAILURE",
        payload: error.message,
      });
    }
  };
};
