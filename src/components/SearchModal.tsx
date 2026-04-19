'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { components, UIComponent } from '@/data/components';
import './SearchModal.css';

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onClose = () => setIsOpen(false);

  // Flatten components and variants into a single searchable list
  const searchItems = components.flatMap((component) => {
    const componentItem = {
      id: component.id,
      name: component.name,
      description: component.description,
      type: 'component' as const,
      componentId: component.id,
    };

    const variantItems = component.variants.map((variant) => ({
      id: `${component.id}-${variant.id}`,
      name: `${component.name}: ${variant.name}`,
      description: `Variant of ${component.name}`,
      type: 'variant' as const,
      componentId: component.id,
      variantId: variant.id,
    }));

    return [componentItem, ...variantItems];
  });

  const filteredItems = searchItems.filter((item) => {
    const queryWords = searchQuery.toLowerCase().split(' ').filter(word => word.length > 0);
    
    // If query is empty, only show top-level components
    if (queryWords.length === 0) {
      return item.type === 'component';
    }

    const itemName = item.name.toLowerCase();
    const itemDesc = item.description.toLowerCase();

    return queryWords.every(word => 
      itemName.includes(word) || itemDesc.includes(word)
    );
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter') {
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      }
    };

    const handleOpenSearch = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-search', handleOpenSearch);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-search', handleOpenSearch);
    };
  }, [isOpen, filteredItems, selectedIndex]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSearchQuery('');
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resultsRef.current && selectedIndex >= 0) {
      const selectedItem = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedItem) {
        selectedItem.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex]);

  const handleSelect = (item: typeof searchItems[0]) => {
    if (item.type === 'variant' && item.variantId) {
      router.push(`/components/${item.componentId}?variant=${item.variantId}`);
    } else {
      router.push(`/components/${item.componentId}`);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search components or variants..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="search-input"
          />
          <kbd className="esc-hint">ESC</kbd>
        </div>
        <div className="search-results" ref={resultsRef}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`search-result-item ${index === selectedIndex ? 'selected' : ''} ${item.type}`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="result-icon">
                  {item.type === 'variant' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 3 4 4-4 4"/><path d="M20 7H4a2 2 0 0 0-2 2v10"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
                  )}
                </div>
                <div className="result-info">
                  <div className="result-name">
                    {item.name}
                  </div>
                  <div className="result-description">{item.description}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No matches found for "{searchQuery}"</div>
          )}
        </div>
        <div className="search-modal-footer">
          <div className="footer-hint">
            <kbd>↑↓</kbd> to navigate
          </div>
          <div className="footer-hint">
            <kbd>Enter</kbd> to select
          </div>
        </div>
      </div>
    </div>
  );
}
