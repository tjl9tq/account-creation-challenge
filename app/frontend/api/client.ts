import { getCSRFToken } from '../utils';

const API_BASE_URL = '/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'X-CSRF-TOKEN': getCSRFToken(),
};

interface CreateAccountResponse {
  success: boolean;
  userId: number;
}

interface User {
  id: number;
  username: string;
}

export interface ErrorResponse {
  success: boolean;
  errors: { [key: string]: string[] };
  message: string;
}

const handleResponse = async <T>(response: Response): Promise<{ data: T | ErrorResponse; status: number }> => {
  if (!response.ok) {
    const errorData = await response.json();
    if (errorData.errors) {
      return {
        data: { errors: errorData.errors, message: errorData.message, success: errorData.success } as ErrorResponse,
        status: response.status,
      };
    } else {
      throw new Error('An unknown error occurred');
    }
  }
  return { data: (await response.json()) as T, status: response.status };
};

export const apiClient = {
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
};
