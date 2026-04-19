'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
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
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link href="/" className="logo">
          UI Docs
        </Link>
      </div>
      <Suspense fallback={<div className="sidebar-nav">Loading navigation...</div>}>
        <SidebarContent />
      </Suspense>
    </aside>
  );
}
