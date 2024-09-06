import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CreateAccount } from './create-account';
import { createAccountClient, ErrorResponse } from 'app/frontend/api';

jest.mock('app/frontend/api', () => ({
  createAccountClient: {
    createAccount: jest.fn(),
  },
}));

describe('CreateAccount Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form with input fields and submit button', () => {
    render(<CreateAccount />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/create account/i)).toBeInTheDocument();
  });

  test('shows validation errors for username and password', () => {
    render(<CreateAccount />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'short' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });

    expect(screen.getByText(/must be at least 10 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/must be at least 20 characters/i)).toBeInTheDocument();
  });

  test('disables submit button if there are validation errors', () => {
    render(<CreateAccount />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'short' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });

    expect(screen.getByText(/create account/i)).toBeDisabled();
  });

  test('enables submit button if inputs are valid', () => {
    render(<CreateAccount />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'validusername' } });
    fireEvent.change(passwordInput, { target: { value: 'ValidPassword123!456789' } });

    expect(screen.getByText(/create account/i)).toBeEnabled();
  });

  test('handles form submission and shows server errors', async () => {
    const mockCreateAccount = createAccountClient.createAccount as jest.Mock;
    mockCreateAccount.mockResolvedValueOnce({
      data: {
        success: false,
        errors: { username: ['Username already exists'], password: ['Password is too weak'] },
      } as unknown as ErrorResponse,
      status: 400,
    });

    render(<CreateAccount />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByText(/create account/i);

    fireEvent.change(usernameInput, { target: { value: 'validusername' } });
    fireEvent.change(passwordInput, { target: { value: 'ValidPassword123!456789' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/username already exists/i)).toBeInTheDocument();
      expect(screen.getByText(/password is too weak/i)).toBeInTheDocument();
    });
  });

  test('redirects on successful account creation', async () => {
    const mockCreateAccount = createAccountClient.createAccount as jest.Mock;
    mockCreateAccount.mockResolvedValueOnce({
      data: { success: true },
      status: 201,
    });

    render(<CreateAccount />);

    // eslint-disable-next-line no-global-assign
    window = Object.create(window);
    const url = 'http://dummy.com';
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
      },
    });
    expect(window.location.href).toEqual(url);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByText(/create account/i);

    fireEvent.change(usernameInput, { target: { value: 'validusername' } });
    fireEvent.change(passwordInput, { target: { value: 'ValidPassword123!456789' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.location.href).toBe('http://localhost:3000/signup/account-selection');
    });
  });
});
