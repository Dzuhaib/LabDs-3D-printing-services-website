import React from 'react';

/**
 * A consistent spacer component used across subpages to clear the 
 * overflowing logo in the sticky Header.
 */
export const LogoSpacer: React.FC = () => {
  return <div className="h-32 md:h-44 lg:h-56" aria-hidden="true" />;
};
