import USER_ACTION_TYPES from "./user.types";

export const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
      };

    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

// CHECK_USER_SESSION: "user/CHECK_USER_SESSION",
//   GOOGLE_SIGN_IN_STATE: "user/GOOGLE_SIGN_IN_STATE",
//   EMAIL_SIGN_IN_STATE: "user/EMAIL_SIGN_IN_STATE",
//   SIGN_IN_SUCCESS: "user/SIGN_IN_SUCCESS",
//   SIGN_IN_FAILED: "user/SIGN_IN_FAILED"
