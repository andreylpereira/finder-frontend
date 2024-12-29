import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  CREATE_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
} from "../types/actionTypes.jsx";

import {
  getItems,
  createItem,
  updateItem
} from "../../services/itemService.jsx";

export const fetchItems = () => async (dispatch) => {
  dispatch({ type: FETCH_ITEMS_REQUEST });

  try {
    const items = await getItems();
    dispatch({
      type: FETCH_ITEMS_SUCCESS,
      payload: items,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ITEMS_FAILURE,
      payload: "Erro ao carregar os itens. Tente novamente mais tarde.",
    });
  }
};

export const createItemAction = (item) => async (dispatch) => {
  try {
    const newItem = await createItem(item);
    dispatch({
      type: CREATE_ITEM_SUCCESS,
      payload: newItem,
    });
  } catch (error) {
    throw error;
  }
};

export const updateItemAction = (item) => async (dispatch) => {
  try {
    const newItem = await updateItem(item, item.id);
    dispatch({
      type: UPDATE_ITEM_SUCCESS,
      payload: newItem,
    });
  } catch (error) {
    throw error;
  }
};


