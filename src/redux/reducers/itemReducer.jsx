import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  CREATE_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
} from "../types/actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      };

    case UPDATE_ITEM_SUCCESS:
    return {
      ...state,
      loading: false, 
      items: state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload }  
          : item 
      ),
    };

    default:
      return state;
  }
};

export default itemReducer;