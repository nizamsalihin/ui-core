'use client';

import { useState, useEffect, useRef } from 'react';
import './ThemeTweaks.css';

export default function ThemeTweaks() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#0070f3');
  const [primaryForeground, setPrimaryForeground] = useState('#111111');
  const [secondaryColor, setSecondaryColor] = useState('#1c1c1e');
  const [secondaryForeground, setSecondaryForeground] = useState('#ffffff');
  const [bgCard, setBgCard] = useState('#ffffff');
  const [textMuted, setTextMuted] = useState('#666666');
  const [cardShadow, setCardShadow] = useState('0 4px 6px rgba(0, 0, 0, 0.05)');
  const [borderRadius, setBorderRadius] = useState('8px');
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        // Only close if it's currently open
        setIsOpen((prev) => {
          if (prev) return false;
          return prev;
        });
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const root = document.documentElement;
    const computedStyles = getComputedStyle(root);
    
    const savedPrimary = localStorage.getItem('theme-primary');
    const savedPrimaryFg = localStorage.getItem('theme-primary-fg');
    const savedSecondary = localStorage.getItem('theme-secondary');
    const savedSecondaryFg = localStorage.getItem('theme-secondary-fg');
    const savedBgCard = localStorage.getItem('theme-bg-card');
    const savedTextMuted = localStorage.getItem('theme-text-muted');
    const savedCardShadow = localStorage.getItem('theme-card-shadow');
    const savedRadius = localStorage.getItem('theme-radius');

    if (savedPrimary) setPrimaryColor(savedPrimary);
    else setPrimaryColor(computedStyles.getPropertyValue('--primary-color').trim() || '#0070f3');

    if (savedPrimaryFg) setPrimaryForeground(savedPrimaryFg);
    else setPrimaryForeground(computedStyles.getPropertyValue('--primary-foreground').trim() || '#111111');

    if (savedSecondary) setSecondaryColor(savedSecondary);
    else setSecondaryColor(computedStyles.getPropertyValue('--secondary-color').trim() || '#1c1c1e');

    if (savedSecondaryFg) setSecondaryForeground(savedSecondaryFg);
    else setSecondaryForeground(computedStyles.getPropertyValue('--secondary-foreground').trim() || '#ffffff');

    if (savedBgCard) setBgCard(savedBgCard);
    else setBgCard(computedStyles.getPropertyValue('--bg-card').trim() || '#ffffff');

    if (savedTextMuted) setTextMuted(savedTextMuted);
    else setTextMuted(computedStyles.getPropertyValue('--text-muted').trim() || '#666666');

    if (savedCardShadow) setCardShadow(savedCardShadow);
    else setCardShadow(computedStyles.getPropertyValue('--card-shadow').trim() || '0 4px 6px rgba(0, 0, 0, 0.05)');

    if (savedRadius) setBorderRadius(savedRadius);
    else setBorderRadius(computedStyles.getPropertyValue('--border-radius').trim() || '8px');
  }, []);

  const handlePrimaryChange = (val: string) => {
    setPrimaryColor(val);
    document.documentElement.style.setProperty('--primary-color', val);
    localStorage.setItem('theme-primary', val);
  };

  const handlePrimaryFgChange = (val: string) => {
    setPrimaryForeground(val);
    document.documentElement.style.setProperty('--primary-foreground', val);
    localStorage.setItem('theme-primary-fg', val);
  };

  const handleSecondaryChange = (val: string) => {
    setSecondaryColor(val);
    document.documentElement.style.setProperty('--secondary-color', val);
    localStorage.setItem('theme-secondary', val);
  };

  const handleSecondaryFgChange = (val: string) => {
    setSecondaryForeground(val);
    document.documentElement.style.setProperty('--secondary-foreground', val);
    localStorage.setItem('theme-secondary-fg', val);
  };

  const handleBgCardChange = (val: string) => {
    setBgCard(val);
    document.documentElement.style.setProperty('--bg-card', val);
    localStorage.setItem('theme-bg-card', val);
  };

  const handleTextMutedChange = (val: string) => {
    setTextMuted(val);
    document.documentElement.style.setProperty('--text-muted', val);
    localStorage.setItem('theme-text-muted', val);
  };

  const handleCardShadowChange = (val: string) => {
    setCardShadow(val);
    document.documentElement.style.setProperty('--card-shadow', val);
    localStorage.setItem('theme-card-shadow', val);
  };

  const handleRadiusChange = (val: string) => {
    setBorderRadius(val);
    document.documentElement.style.setProperty('--border-radius', val);
    localStorage.setItem('theme-radius', val);
  };

  if (!isMounted) return null;

  return (
    <>
      <button 
        className={`theme-tweaks-toggle ${isOpen ? 'hidden' : ''}`} 
        onClick={() => setIsOpen(true)}
        aria-label="Open theme tweaks"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>

      <div ref={sidebarRef} className={`theme-tweaks-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="theme-tweaks-header">
          <h3>Theme Tweaks</h3>
          <button className="theme-tweaks-close" onClick={() => setIsOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="theme-tweaks-content">
          <div className="tweak-item">
            <label>Primary Color</label>
            <div className="tweak-input-wrapper">
              <input 
                type="color" 
                value={primaryColor} 
                onChange={(e) => handlePrimaryChange(e.target.value)} 
                className="tweak-color"
              />
              <span>{primaryColor}</span>
            </div>
          </div>
          
          <div className="tweak-item">
            <label>Primary Foreground</label>
            <div className="tweak-input-wrapper">
              <input 
                type="color" 
                value={primaryForeground} 
                onChange={(e) => handlePrimaryFgChange(e.target.value)} 
                className="tweak-color"
              />
              <span>{primaryForeground}</span>
            </div>
          </div>
          
          <div className="tweak-item">
            <label>Secondary Color</label>
            <div className="tweak-input-wrapper">
              <input 
                type="color" 
                value={secondaryColor} 
                onChange={(e) => handleSecondaryChange(e.target.value)} 
                className="tweak-color"
              />
              <span>{secondaryColor}</span>
            </div>
          </div>

          <div className="tweak-item">
            <label>Secondary Foreground</label>
            <div className="tweak-input-wrapper">
              <input 
                type="color" 
                value={secondaryForeground} 
                onChange={(e) => handleSecondaryFgChange(e.target.value)} 
                className="tweak-color"
              />
              <span>{secondaryForeground}</span>
            </div>
          </div>

          <div className="tweak-item">
            <label>Card Background</label>
            <div className="tweak-input-wrapper">
              <input 
                type="color" 
                value={bgCard} 
                onChange={(e) => handleBgCardChange(e.target.value)} 
                className="tweak-color"
              />
              <span>{bgCard}</span>
            </div>
          </div>

          <div className="tweak-item">
            <label>Muted Text</label>
            <div className="tweak-input-wrapper">
              <input 
                type="color" 
                value={textMuted} 
                onChange={(e) => handleTextMutedChange(e.target.value)} 
                className="tweak-color"
              />
              <span>{textMuted}</span>
            </div>
          </div>

          <div className="tweak-item">
            <label>Card Shadow</label>
            <input 
              type="text" 
              value={cardShadow} 
              onChange={(e) => handleCardShadowChange(e.target.value)} 
              className="tweak-text-input"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)' }}
            />
          </div>
          
          <div className="tweak-item">
            <label>Border Radius</label>
            <select 
              value={borderRadius} 
              onChange={(e) => handleRadiusChange(e.target.value)}
              className="tweak-select"
            >
              <option value="0px">0px</option>
              <option value="4px">4px</option>
              <option value="8px">8px</option>
              <option value="12px">12px</option>
              <option value="9999px">Pill</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
