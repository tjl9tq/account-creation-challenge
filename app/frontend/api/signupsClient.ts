import { defaultHeaders, handleResponse } from '.';

export interface CreateAccountResponse {
  success: boolean;
  userId: number;
}

export interface User {
  id: number;
  username: string;
}

export const signupsClient = {
  sessionStatus: async () => {
    const response = await fetch('status', {
      method: 'GET',
      headers: defaultHeaders,
    });
    return handleResponse(response);
  },

  logout: async () => {
    const response = await fetch('logout', {
      method: 'DELETE',
      headers: defaultHeaders,
    });
    return handleResponse(response);
  },
};

export default signupsClient;
