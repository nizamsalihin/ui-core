'use client';

import { useState, useEffect } from 'react';
import './Settings.css';

export default function SettingsPage() {
  const [primaryColor, setPrimaryColor] = useState('#0070f3');
  const [secondaryColor, setSecondaryColor] = useState('#1c1c1e');
  const [borderRadius, setBorderRadius] = useState('8px');
  const [fontFamily, setFontFamily] = useState('Inter');

  // Load from local storage or root styles on mount
  useEffect(() => {
    const root = document.documentElement;
    const computedStyles = getComputedStyle(root);
    
    const savedPrimary = localStorage.getItem('theme-primary');
    const savedSecondary = localStorage.getItem('theme-secondary');
    const savedRadius = localStorage.getItem('theme-radius');
    const savedFont = localStorage.getItem('theme-font');

    if (savedPrimary) setPrimaryColor(savedPrimary);
    else setPrimaryColor(computedStyles.getPropertyValue('--primary-color').trim() || '#0070f3');

    if (savedSecondary) setSecondaryColor(savedSecondary);
    else setSecondaryColor(computedStyles.getPropertyValue('--secondary-color').trim() || '#1c1c1e');

    if (savedRadius) setBorderRadius(savedRadius);
    else setBorderRadius(computedStyles.getPropertyValue('--border-radius').trim() || '8px');

    if (savedFont) setFontFamily(savedFont);
    else setFontFamily(computedStyles.getPropertyValue('--font-family').split(',')[0].replace(/['"]/g, '').trim() || 'Inter');
  }, []);

  // Update root variables when state changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', primaryColor);
    root.style.setProperty('--secondary-color', secondaryColor);
    root.style.setProperty('--border-radius', borderRadius);
    
    let fontString = fontFamily;
    if (fontFamily !== 'Inter' && fontFamily !== 'system-ui') {
      fontString = `'${fontFamily}', sans-serif`;
    }
    root.style.setProperty('--font-family', fontString);

    localStorage.setItem('theme-primary', primaryColor);
    localStorage.setItem('theme-secondary', secondaryColor);
    localStorage.setItem('theme-radius', borderRadius);
    localStorage.setItem('theme-font', fontFamily);
  }, [primaryColor, secondaryColor, borderRadius, fontFamily]);

  const resetTheme = () => {
    setPrimaryColor('#0070f3');
    setSecondaryColor('#1c1c1e');
    setBorderRadius('8px');
    setFontFamily('Inter');
    localStorage.removeItem('theme-primary');
    localStorage.removeItem('theme-secondary');
    localStorage.removeItem('theme-radius');
    localStorage.removeItem('theme-font');
    const root = document.documentElement;
    root.style.removeProperty('--primary-color');
    root.style.removeProperty('--secondary-color');
    root.style.removeProperty('--border-radius');
    root.style.removeProperty('--font-family');
  };

  return (
    <div className="container settings-page">
      <header className="page-header">
        <h1 className="page-title">Theme Settings</h1>
        <p className="page-description">
          Customize the look and feel of the components. Your changes are saved locally
          and will reflect across the entire documentation site immediately.
        </p>
      </header>

      <div className="settings-grid">
        <div className="setting-card">
          <h3 className="setting-title">Primary Color</h3>
          <p className="setting-desc">Used for main actions and active states.</p>
          <div className="color-picker-wrapper">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="color-picker"
            />
            <span className="color-value">{primaryColor}</span>
          </div>
        </div>

        <div className="setting-card">
          <h3 className="setting-title">Secondary Color</h3>
          <p className="setting-desc">Used for secondary buttons and accents.</p>
          <div className="color-picker-wrapper">
            <input
              type="color"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              className="color-picker"
            />
            <span className="color-value">{secondaryColor}</span>
          </div>
        </div>

        <div className="setting-card">
          <h3 className="setting-title">Border Radius</h3>
          <p className="setting-desc">Global border radius for cards and inputs.</p>
          <select
            value={borderRadius}
            onChange={(e) => setBorderRadius(e.target.value)}
            className="setting-select"
          >
            <option value="0px">0px (Square)</option>
            <option value="4px">4px (Small)</option>
            <option value="8px">8px (Medium)</option>
            <option value="12px">12px (Large)</option>
            <option value="9999px">9999px (Pill)</option>
          </select>
        </div>

        <div className="setting-card">
          <h3 className="setting-title">Typography</h3>
          <p className="setting-desc">Global font family for the application.</p>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="setting-select"
          >
            <option value="Inter">Inter (Default)</option>
            <option value="Roboto">Roboto</option>
            <option value="Outfit">Outfit</option>
            <option value="monospace">Monospace</option>
            <option value="serif">Serif</option>
          </select>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn btn-secondary" onClick={resetTheme}>
          Reset to Defaults
        </button>
      </div>

      <div className="preview-section-settings">
        <h3 className="setting-title">Live Preview</h3>
        <div className="live-preview-box">
          <button className="btn btn-primary" style={{ marginRight: '1rem' }}>Primary Button</button>
          <button className="btn btn-secondary">Secondary Button</button>
        </div>
      </div>
    </div>
  );
}
