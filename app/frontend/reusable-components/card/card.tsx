import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function Card({ children, title, description }: Props) {
  return (
    <section className="p-10 shadow-card min-h-[400px] w-full rounded-2xl border border-solid border-slate-200">
      <img src="/images/wealthfront-logo.svg" style={{ height: 70, margin: 'auto' }} />
      {title && (
        <h1 className="text-3xl font-medium mt-6 mb-12 font-extrabold" style={{ textAlign: 'center' }}>
          {title}
        </h1>
      )}
      <p className="text-[hsla(243,30%,13%,.63)] text-base m-0 mb-1">{description}</p>
      {children}
    </section>
  );
}
