import {
  FETCH_PUBLIC_ITEMS_REQUEST,
  FETCH_PUBLIC_ITEMS_SUCCESS,
  FETCH_PUBLIC_ITEMS_FAILURE,
} from "../types/actionTypes";

const initialState = {
  publicItems: [],
  loading: false,
  error: null,
};

const itemPublicReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PUBLIC_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_PUBLIC_ITEMS_SUCCESS:
      return {
        ...state,
        publicItems: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_PUBLIC_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default itemPublicReducer;