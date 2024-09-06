import { API_BASE_URL, defaultHeaders, handleResponse } from '.';

export interface CreateAccountResponse {
  success: boolean;
  userId: number;
}

export interface User {
  id: number;
  username: string;
}

export interface PasswordStrengthResponse {
  score: number;
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

  passwordStrength: async (password: string) => {
    const response = await fetch(`${API_BASE_URL}/password-strength`, {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: defaultHeaders,
    });
    return handleResponse<PasswordStrengthResponse>(response);
  },
};

export default createAccountClient;
