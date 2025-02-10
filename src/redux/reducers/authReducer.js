// Your currency reducer
const initialState = {
  authData: null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "REFRESH_AUTH_SUCCESS":
      // Update the state with the response payload
      return {
        ...state,
        // Update state properties with the necessary data from the payload
        // For example, you can set a new token or update the user's authentication status
        // Example: token: action.payload.token,
        // Example: isAuthenticated: true,
        // ...
        authData: action.payload,
        error: null,
      };
    case "REFRESH_AUTH_FAILURE":
      // Update the state with the error payload
      return {
        ...state,
        // Update state properties to handle the error
        error: action.payload,
      };
    default:
      return state;
  }
}
