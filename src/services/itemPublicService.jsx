import api from "./api";

const _URL = "/items";

export const getPublicItems = async () => {
  try {
    const response = await api.get(`${_URL}/public`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
