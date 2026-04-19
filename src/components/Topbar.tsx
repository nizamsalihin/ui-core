'use client';

import React from 'react';
import './Topbar.css';

export default function Topbar() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent('open-search'));
  };

  const isMac = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

  return (
    <header className="topbar">
      <div className="topbar-left">
        {/* Placeholder for breadcrumbs or other elements */}
      </div>
      <div className="topbar-right">
        <button className="search-trigger" onClick={handleOpenSearch} aria-label="Search components">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <span className="search-text">Search components...</span>
          <kbd className="search-shortcut">
            {mounted ? (isMac ? '⌘K' : 'Ctrl+K') : 'K'}
          </kbd>
        </button>
      </div>
    </header>
  );
}
