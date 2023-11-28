import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../../reusable-components/card/card.tsx';
import { FlowLayout } from '../../../reusable-components/flow-layout/flow-layout.tsx';

export function AccountSelection() {
  return (
    <FlowLayout>
      <Card title="What type of account would you like?" description="You can open a new account in just 5 minutes.">
        <div className="space-y-2 first-child:border-t-slate-200">
          <Link
            to="/signup/create-user?type=cash"
            className="text-gray-500 block hover:bg-purple-50 transform-[background-color] duration-100 ease-in p-4 pl-2 rounded-2xl"
          >
            I want to open a cash account.
          </Link>
          <div className="bg-slate-200 h-px w-full" />
          <Link
            to="/signup/create-user?type=investing"
            className="text-gray-500 block hover:bg-purple-50 transform-[background-color] duration-100 ease-in p-4 pl-2 rounded-2xl"
          >
            I want to open an investing account.
          </Link>
        </div>
      </Card>
    </FlowLayout>
  );
}
