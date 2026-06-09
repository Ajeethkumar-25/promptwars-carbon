import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const formatPathName = (name) => {
    if (name === 'calculate') return 'Calculator';
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <nav aria-label="breadcrumb" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
      <Link to="/" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }} aria-label="Home">
        <Home size={16} />
      </Link>
      
      {pathnames.length > 0 && <ChevronRight size={16} />}
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <span key={name} style={{ color: 'var(--text-primary)', fontWeight: '500' }} aria-current="page">
            {formatPathName(name)}
          </span>
        ) : (
          <React.Fragment key={name}>
            <Link to={routeTo} style={{ color: 'var(--text-secondary)' }}>
              {formatPathName(name)}
            </Link>
            <ChevronRight size={16} />
          </React.Fragment>
        );
      })}
    </nav>
  );
}
