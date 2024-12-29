import api, { getUserIdFromToken } from "./api";

const _URL = "/items";

export const getItems = async () => {
  try {
    const response = await api.get(`${_URL}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getItemById = async (idItem) => {
  if (!idItem) {
    throw new Error("Usuário não autenticado.");
  }
  try {
    const response = await api.get(`${_URL}/${idItem}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createItem = async (item) => {
  const userId = getUserIdFromToken();
  
  try {
    item.userId = userId;
    const response = await api.post(`${_URL}`, item);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateItem = async (item, idItem) => {
  const userId = getUserIdFromToken();
  try {
    item.userId = userId;
    const response = await api.put(`${_URL}/${idItem}`, item);
    return response.data;
  } catch (error) {
    throw error;
  }
};
