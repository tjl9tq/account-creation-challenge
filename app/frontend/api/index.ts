import { getCSRFToken } from '../utils';
import signupsClient from './signupsClient';
import createAccountClient from './createAccountClient';

export const API_BASE_URL = '/api';

export const defaultHeaders = {
  'Content-Type': 'application/json',
  'X-CSRF-TOKEN': getCSRFToken(),
};

export interface ErrorResponse {
  success: boolean;
  errors: { [key: string]: string[] };
  message: string;
}

export const handleResponse = async <T>(response: Response): Promise<{ data: T | ErrorResponse; status: number }> => {
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

export { signupsClient };
export { createAccountClient };
