import { signupsClient } from 'app/frontend/api';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  showLogoutButton?: boolean;
}

export function FlowLayout({ children, showLogoutButton = true }: Props) {
  return (
    <div className="h-full mt-10 max-w-[1000px] mx-auto">
      <div className="w-full text-right">
        {showLogoutButton && (
          <button
            onClick={() => {
              signupsClient.logout().then(() => {
                console.log('hello');
                window.location.href = 'http://localhost:3000/create-account';
              });
            }}
          >
            Logout
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
