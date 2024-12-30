import api from "./api";

const _URL = "/forms";

export const createForm = async (form) => {
  try {
    const response = await api.post(`${_URL}`, form);
    return response.data;
  } catch (error) {
    throw error;
  }
};
