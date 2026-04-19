'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { components } from '@/data/components';
import './Sidebar.css';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link href="/" className="logo">
          UI Docs
        </Link>
      </div>

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
          {components.map((component) => (
            <Link
              key={component.id}
              href={`/components/${component.id}`}
              className={`nav-link ${pathname === `/components/${component.id}` ? 'active' : ''}`}
            >
              {component.name}
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
}
