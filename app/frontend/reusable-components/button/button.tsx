import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  type?: 'button' | 'submit';
  href?: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

const classes = (disabled: boolean) =>
  `inline-block py-3 px-6 bg-wealthfront text-white rounded w-full transition duration-100 ${
    disabled ? 'opacity-40' : `hover:!opacity-90 active:scale-[.995]`
  }`;

export function Button({ href, children, type, disabled = false, className }: ButtonProps) {
  const classNameProp = `${classes(disabled)} ${className}`;

  if (href) {
    return (
      <Link to={href} className={classNameProp}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classNameProp} disabled={disabled}>
      {children}
    </button>
  );
}
