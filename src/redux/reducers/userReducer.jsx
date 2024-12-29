import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
} from "../types/actionTypes";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
      };

    case UPDATE_USER_SUCCESS:
    return {
      ...state,
      loading: false, 
      users: state.users.map((user) =>
        user.id === action.payload.id
          ? { ...user, ...action.payload }  
          : user 
      ),
    };

    default:
      return state;
  }
};

export default userReducer;