'use client';

import { use, useState, useEffect, useRef } from 'react';
import { components } from '@/data/components';
import ThemeTweaks from '@/components/ThemeTweaks';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './ComponentDetail.css';

export default function ComponentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use() as per Next.js 15+ patterns for async params
  const { id } = use(params);
  
  const component = components.find((c) => c.id === id);

  if (!component) {
    notFound();
  }

  const router = useRouter();
  const searchParams = useSearchParams();
  const queryVariant = searchParams.get('variant');

  const [activeVariantId, setActiveVariantId] = useState(queryVariant || component.variants[0]?.id);

  useEffect(() => {
    if (queryVariant && component.variants.some(v => v.id === queryVariant)) {
      setActiveVariantId(queryVariant);
    }
  }, [queryVariant, component.variants]);

  const handleVariantSelect = (variantId: string) => {
    setActiveVariantId(variantId);
    router.push(`/components/${id}?variant=${variantId}`, { scroll: false });
  };
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [copySuccess, setCopySuccess] = useState(false);

  const activeVariant = component.variants.find((v) => v.id === activeVariantId) || component.variants[0];

  const executedVariantRef = useRef<string | null>(null);

  // Override window.alert to show a premium toast notification
  // This prevents iframe sandbox blocking and looks much better!
  useEffect(() => {
    const originalAlert = window.alert;
    window.alert = (msg: any) => {
      const toast = document.createElement('div');
      toast.textContent = String(msg);
      toast.style.position = 'fixed';
      toast.style.bottom = '20px';
      toast.style.right = '20px';
      toast.style.backgroundColor = 'var(--text-color, #333)';
      toast.style.color = 'var(--bg-color, #fff)';
      toast.style.padding = '12px 24px';
      toast.style.borderRadius = '8px';
      toast.style.zIndex = '9999';
      toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      toast.style.fontFamily = 'var(--font-family, sans-serif)';
      toast.style.fontSize = '0.95rem';
      toast.style.fontWeight = '500';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      
      document.body.appendChild(toast);
      
      // Animate in
      requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
      });

      // Animate out and remove
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    };

    return () => {
      window.alert = originalAlert;
    };
  }, []);

  useEffect(() => {
    if (executedVariantRef.current === activeVariant.id) return;
    executedVariantRef.current = activeVariant.id;

    // Strip simple TS types to make it valid JS for execution (if any remain)
    const jsCode = activeVariant.js.replace(/: void/g, '');
    
    // Inject the script into the document to make the preview interactive
    const script = document.createElement('script');
    script.id = 'preview-script';
    script.innerHTML = `
      (function() {
        try {
          ${jsCode}
        } catch(e) {
          console.error("Preview script error:", e);
        }
      })();
    `;
    
    document.body.appendChild(script);

    return () => {
      document.getElementById('preview-script')?.remove();
    };
  }, [activeVariant]);

  const handleCopy = () => {
    const codeToCopy = activeVariant[activeTab];
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <div className="container component-detail-page">
      <header className="page-header">
        <div className="page-header-top">
          <h1 className="page-title">{component.name}</h1>
          {component.variants.length > 1 && (
            <div className="variants-dropdown">
              <label htmlFor="variant-select" className="variants-dropdown-label">Variant:</label>
              <select
                id="variant-select"
                className="variant-select"
                value={activeVariantId}
                onChange={(e) => handleVariantSelect(e.target.value)}
              >
                {component.variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <p className="page-description">{component.description}</p>
      </header>

      <div className="preview-section">
        <ThemeTweaks />
        <div className="preview-canvas">
          <div dangerouslySetInnerHTML={{ __html: activeVariant.html || '' }} />
        </div>
      </div>

        <div className="code-section">
          <div className="code-header">
            <div className="code-tabs">
              <button
                className={`code-tab ${activeTab === 'html' ? 'active' : ''}`}
                onClick={() => setActiveTab('html')}
              >
                HTML
              </button>
              <button
                className={`code-tab ${activeTab === 'css' ? 'active' : ''}`}
                onClick={() => setActiveTab('css')}
              >
                CSS
              </button>
              <button
                className={`code-tab ${activeTab === 'js' ? 'active' : ''}`}
                onClick={() => setActiveTab('js')}
              >
                Javascript
              </button>
            </div>
            <button className="copy-btn" onClick={handleCopy}>
              {copySuccess ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
          <div className="code-content" style={{ padding: 0 }}>
            <SyntaxHighlighter
              language={activeTab === 'js' ? 'javascript' : activeTab}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '1.5rem',
                background: 'transparent',
                fontSize: '0.9rem',
                lineHeight: '1.5',
              }}
            >
              {activeVariant[activeTab]}
            </SyntaxHighlighter>
          </div>
      </div>
    </div>
  );
}
