import { Button } from 'app/frontend/reusable-components/button/button';
import { Card } from 'app/frontend/reusable-components/card/card';
import { FlowLayout } from 'app/frontend/reusable-components/flow-layout/flow-layout';
import { Input } from 'app/frontend/reusable-components/input/input';
import { getCSRFToken } from 'app/frontend/utils';
import React, { useEffect, useState } from 'react';

export const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch('/api/create-account', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getCSRFToken(),
      },
    });
  };

  useEffect(() => {
    fetch('/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getCSRFToken(),
      },
    });
  }, []);

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };
  const disableSubmit = !username || !password;
  return (
    <FlowLayout showLogoutButton={false}>
      <Card title={'Create New Account'}>
        <form onSubmit={handleSubmit}>
          <Input label="Username" onChange={handleUsernameChange} />
          <Input label="Password" onChange={(value) => setPassword(value)} type="password" />
          <Button type="submit" disabled={disableSubmit}>
            Create Account
          </Button>
        </form>
      </Card>
    </FlowLayout>
  );
};
