import type { ReactNode } from 'react';

export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-page px-4 sm:px-8 xl:px-16 ${className}`}>
      {children}
    </div>
  );
}
