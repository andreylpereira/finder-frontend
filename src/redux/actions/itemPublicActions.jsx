import {
  FETCH_PUBLIC_ITEMS_REQUEST,
  FETCH_PUBLIC_ITEMS_SUCCESS,
  FETCH_PUBLIC_ITEMS_FAILURE,
} from "../types/actionTypes.jsx";

import { getPublicItems } from "../../services/itemPublicService.jsx";

export const fetchPublicItems = () => async (dispatch) => {
  dispatch({ type: FETCH_PUBLIC_ITEMS_REQUEST });

  try {
    const publicItems = await getPublicItems(); 
    dispatch({
      type: FETCH_PUBLIC_ITEMS_SUCCESS,
      payload: publicItems,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PUBLIC_ITEMS_FAILURE,
      payload: "Erro ao carregar os itens. Tente novamente mais tarde.",
    });
  }
};
