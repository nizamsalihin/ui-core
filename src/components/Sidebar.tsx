'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { components } from '@/data/components';
import './Sidebar.css';

function SidebarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeVariant = searchParams.get('variant');

  return (
    <nav className="sidebar-nav">
      <div className="nav-group">
        <div className="nav-group-title">General</div>
        <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
          Introduction
        </Link>
        <Link href="/settings" className={`nav-link ${pathname === '/settings' ? 'active' : ''}`}>
          Theme Settings
        </Link>
      </div>

      <div className="nav-group">
        <div className="nav-group-title">Components</div>
        {components.map((component) => {
          const isActiveComponent = pathname === `/components/${component.id}`;
          return (
            <div key={component.id} className="nav-component-group">
              <Link
                href={`/components/${component.id}`}
                className={`nav-link ${isActiveComponent && !activeVariant ? 'active' : ''}`}
              >
                {component.name}
              </Link>
              {isActiveComponent && component.variants.length > 1 && (
                <div className="nav-submenu">
                  {component.variants.map((variant) => (
                    <Link
                      key={variant.id}
                      href={`/components/${component.id}?variant=${variant.id}`}
                      className={`nav-submenu-link ${activeVariant === variant.id ? 'active' : ''}`}
                    >
                      {variant.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button 
        className="mobile-nav-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        )}
      </button>

      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link href="/" className="logo">
            UI Docs
          </Link>
        </div>
        <Suspense fallback={<div className="sidebar-nav">Loading navigation...</div>}>
          <SidebarContent />
        </Suspense>
      </aside>
    </>
  );
}
