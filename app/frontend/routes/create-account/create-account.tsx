import { createAccountClient, ErrorResponse } from 'app/frontend/api';
import { Button } from 'app/frontend/reusable-components/button/button';
import { Card } from 'app/frontend/reusable-components/card/card';
import { FlowLayout } from 'app/frontend/reusable-components/flow-layout/flow-layout';
import { Input } from 'app/frontend/reusable-components/input/input';
import React, { useState } from 'react';

export const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validate = (value: string, validations: ((value: string) => string | null)[]) => {
    for (const validate of validations) {
      const errorMsg = validate(value);
      if (errorMsg) return errorMsg;
    }
    return null;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const usernameValidationError = validate(username, usernameValidations);
    const passwordValidationError = validate(password, passwordValidations);

    if (usernameValidationError) {
      setUsernameError(usernameValidationError);
      return;
    }

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    createAccountClient.createAccount(username, password).then((res) => {
      if (res.data.success && res.status === 201) {
        window.location.href = 'http://localhost:3000/signup/account-selection';
      } else {
        const errors = (res.data as ErrorResponse).errors;
        if (errors?.username && errors?.username.length > 0) {
          setUsernameError(`Username ${errors?.username[0]}`);
        }
        if (errors?.password && errors?.password.length > 0) {
          setPasswordError(`Password ${errors?.password[0]}`);
        }
      }
    });
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    const errorMsg = validate(value, usernameValidations);
    setUsernameError(errorMsg);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const errorMsg = validate(value, passwordValidations);
    setPasswordError(errorMsg);
  };

  const usernameValidations = [
    (value: string) => (value.length < 10 ? 'Must be at least 10 characters' : null),
    (value: string) => (value.length > 50 ? 'Must be less than 50 characters' : null),
  ];

  const passwordValidations = [
    (value: string) => (value.length < 20 ? 'Must be at least 20 characters' : null),
    (value: string) => (value.length > 50 ? 'Must be less than 50 characters' : null),
    (value: string) =>
      !/[a-zA-Z]/.test(value) || !/[0-9]/.test(value) ? 'Must contain at least one letter and one number' : null,
  ];

  const disableSubmit = !username || !password || !!usernameError || !!passwordError;
  return (
    <FlowLayout showLogoutButton={false}>
      <Card title="Create New Account">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input label="Username" onChange={handleUsernameChange} error={usernameError} />
            <Input label="Password" onChange={handlePasswordChange} type="password" error={passwordError} />
          </div>
          <Button type="submit" disabled={disableSubmit} className="mt-8">
            Create Account
          </Button>
        </form>
      </Card>
    </FlowLayout>
  );
};
