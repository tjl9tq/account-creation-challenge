import { getCSRFToken } from '../utils';

const API_BASE_URL = '/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'X-CSRF-TOKEN': getCSRFToken(),
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong.');
  }
  return response.json();
};

export const apiClient = {
  createAccount: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/create-account`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: defaultHeaders,
    });
    return handleResponse(response);
  },

  fetchUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: defaultHeaders,
    });
    return handleResponse(response);
  },
};
