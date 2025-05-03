
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const Link: React.FC<LinkProps> = ({ href, children, className = '' }) => {
  return (
    <RouterLink to={href} className={className}>
      {children}
    </RouterLink>
  );
};

export default Link;
