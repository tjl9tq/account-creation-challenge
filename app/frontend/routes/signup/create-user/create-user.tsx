import React from 'react';
import { Button } from '../../../reusable-components/button/button.tsx';
import { Card } from '../../../reusable-components/card/card.tsx';
import { FlowLayout } from '../../../reusable-components/flow-layout/flow-layout.tsx';
import { Input } from '../../../reusable-components/input/input';

export function CreateUser() {
  return (
    <FlowLayout>
      <Card title="What's your first and last name?">
        <form>
          <div className="space-y-4">
            <Input label="First name" required />
            <Input label="Last name" required />
            <Input label="Email" required />
          </div>
          <Button href="/signup/joint-access" disabled={false} className="mt-8">
            Continue
          </Button>
        </form>
      </Card>
    </FlowLayout>
  );
}
