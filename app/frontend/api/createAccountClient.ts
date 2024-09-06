import { API_BASE_URL, defaultHeaders, handleResponse } from '.';

export interface CreateAccountResponse {
  success: boolean;
  userId: number;
}

export interface User {
  id: number;
  username: string;
}

export const createAccountClient = {
  createAccount: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/create-account`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: defaultHeaders,
    });
    return handleResponse<CreateAccountResponse>(response);
  },

  fetchUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: defaultHeaders,
    });
    return handleResponse<User[]>(response);
  },

  login: async (username: string, password: string) => {
    const response = await fetch(`/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: defaultHeaders,
    });
    return handleResponse(response);
  },
};

export default createAccountClient;
