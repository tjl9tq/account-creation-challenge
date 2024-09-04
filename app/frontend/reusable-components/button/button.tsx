import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  type?: 'button' | 'submit';
  href?: string;
  children: ReactNode;
  disabled?: boolean;
}

const classes = `inline-block py-3 px-6 bg-wealthfront text-white rounded w-full`;

export function Button({ href, children, type, disabled = false }: Props) {
  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${classes} transition duration-200 bg-wealthfront ${
        disabled ? 'opacity-40' : `hover:!opacity-90 active:scale-[.99]`
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
