import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  showLogoutButton?: boolean;
}

export function FlowLayout({ children, showLogoutButton = true }: Props) {
  return (
    <div className="h-full mt-10 max-w-[1000px] mx-auto">
      <div className="w-full text-right">
        {showLogoutButton && (
          <Link to="/logout" reloadDocument>
            Logout
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
