import api, { getUserIdFromToken } from "./api";

const _URL = "/users";

export const getUsers = async () => {
  try {
    const response = await api.get(`${_URL}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (idUser) => {
  if (!idUser) {
    throw new Error("Usuário não autenticado.");
  }
  try {
    const response = await api.get(`${_URL}/${idUser}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const response = await api.post(`${_URL}`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (user, idUser) => {
  try {
    const response = await api.patch(`${_URL}/${idUser}`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (password) => {
  const idUser = getUserIdFromToken();
  if (!idUser) {
    throw new Error("Usuário não autenticado.");
  }

  try {
    const response = await api.patch(
      `${_URL}/change-password/${idUser}`,
      password,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
