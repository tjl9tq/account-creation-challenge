import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  type?: 'button' | 'submit';
  href?: string;
  children: ReactNode;
  disabled?: boolean;
}

const classes = 'inline-block py-3 px-6 bg-[hsla(244,49%,49%,1)]  text-white rounded w-full';

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
      className={`${classes} transition-opacity duration-300 ${
        disabled ? 'opacity-40' : 'hover:bg-[hsla(244,49%,40%,1)]}'
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
