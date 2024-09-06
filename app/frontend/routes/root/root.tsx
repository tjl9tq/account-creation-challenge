import React from 'react';

import { FlowLayout } from '../../reusable-components/flow-layout/flow-layout.tsx';
import { Button } from 'app/frontend/reusable-components/button/button.tsx';
import { Card } from 'app/frontend/reusable-components/card/card.tsx';

export function Root() {
  return (
    <FlowLayout>
      <Card>
        <Button href="/create-account" className="text-xl">
          Get started
        </Button>
      </Card>
    </FlowLayout>
  );
}
