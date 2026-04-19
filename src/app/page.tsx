import Link from 'next/link';
import { components } from '@/data/components';
import './Home.css';

export default function Home() {
  return (
    <div className="container">
      <header className="home-header">
        <h1 className="page-title">UI Component Library</h1>
        <p className="page-description">
          A collection of beautifully designed, copy-paste ready UI components.
          Built with HTML, CSS, and TypeScript.
        </p>
      </header>

      <div className="component-grid">
        {components.map((component) => (
          <Link href={`/components/${component.id}`} key={component.id} className="component-card">
            <div className="component-card-preview">
              {/* Previewing the first variant html */}
              <div
                dangerouslySetInnerHTML={{ __html: component.variants[0]?.html || '' }}
                className="preview-wrapper"
              />
            </div>
            <div className="component-card-content">
              <h2 className="component-card-title">{component.name}</h2>
              <p className="component-card-desc">{component.description}</p>
              <span className="variant-count">{component.variants.length} Variants</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
