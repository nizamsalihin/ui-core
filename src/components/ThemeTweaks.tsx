'use client';

import { useState, useEffect } from 'react';
import './ThemeTweaks.css';

export default function ThemeTweaks() {
  const [isOpen, setIsOpen] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#0070f3');
  const [primaryForeground, setPrimaryForeground] = useState('#ffffff');
  const [secondaryColor, setSecondaryColor] = useState('#1c1c1e');
  const [secondaryForeground, setSecondaryForeground] = useState('#ffffff');
  const [borderRadius, setBorderRadius] = useState('8px');

  useEffect(() => {
    const root = document.documentElement;
    const computedStyles = getComputedStyle(root);
    
    const savedPrimary = localStorage.getItem('theme-primary');
    const savedPrimaryFg = localStorage.getItem('theme-primary-fg');
    const savedSecondary = localStorage.getItem('theme-secondary');
    const savedSecondaryFg = localStorage.getItem('theme-secondary-fg');
    const savedRadius = localStorage.getItem('theme-radius');

    if (savedPrimary) setPrimaryColor(savedPrimary);
    else setPrimaryColor(computedStyles.getPropertyValue('--primary-color').trim() || '#0070f3');

    if (savedPrimaryFg) setPrimaryForeground(savedPrimaryFg);
    else setPrimaryForeground(computedStyles.getPropertyValue('--primary-foreground').trim() || '#ffffff');

    if (savedSecondary) setSecondaryColor(savedSecondary);
    else setSecondaryColor(computedStyles.getPropertyValue('--secondary-color').trim() || '#1c1c1e');

    if (savedSecondaryFg) setSecondaryForeground(savedSecondaryFg);
    else setSecondaryForeground(computedStyles.getPropertyValue('--secondary-foreground').trim() || '#ffffff');

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

  const handleRadiusChange = (val: string) => {
    setBorderRadius(val);
    document.documentElement.style.setProperty('--border-radius', val);
    localStorage.setItem('theme-radius', val);
  };

  return (
    <>
      <button 
        className={`theme-tweaks-toggle ${isOpen ? 'hidden' : ''}`} 
        onClick={() => setIsOpen(true)}
        aria-label="Open theme tweaks"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          <path d="M19 3v4"></path>
          <path d="M21 5h-4"></path>
        </svg>
      </button>

      <div className={`theme-tweaks-sidebar ${isOpen ? 'open' : ''}`}>
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
