import primaryHtml from './components/button/primary/html';
import primaryCss from './components/button/primary/css';
import primaryJs from './components/button/primary/js';

import iconHtml from './components/button/icon/html';
import iconCss from './components/button/icon/css';
import iconJs from './components/button/icon/js';

import secondaryHtml from './components/button/secondary/html';
import secondaryCss from './components/button/secondary/css';
import secondaryJs from './components/button/secondary/js';

import outlineHtml from './components/button/outline/html';
import outlineCss from './components/button/outline/css';
import outlineJs from './components/button/outline/js';

import outlineSecondaryHtml from './components/button/outline-secondary/html';
import outlineSecondaryCss from './components/button/outline-secondary/css';
import outlineSecondaryJs from './components/button/outline-secondary/js';

import transparentHtml from './components/button/transparent/html';
import transparentCss from './components/button/transparent/css';
import transparentJs from './components/button/transparent/js';

import aiInsightsHtml from './components/button/ai-insights/html';
import aiInsightsCss from './components/button/ai-insights/css';
import aiInsightsJs from './components/button/ai-insights/js';

import linkBaseHtml from './components/link/base/html';
import linkBaseCss from './components/link/base/css';

import linkActiveHoverHtml from './components/link/active-on-hover/html';
import linkActiveHoverCss from './components/link/active-on-hover/css';

import cardBasicHtml from './components/card/basic/html';
import cardBasicCss from './components/card/basic/css';

export interface ComponentVariant {
  id: string;
  name: string;
  html: string;
  css: string;
  js?: string;
}

export interface UIComponent {
  id: string;
  name: string;
  description: string;
  variants: ComponentVariant[];
}

export const components: UIComponent[] = [
  {
    id: 'button',
    name: 'Button',
    description: 'Interactive button component used for triggering actions.',
    variants: [
      {
        id: 'primary',
        name: 'Primary',
        html: primaryHtml,
        css: primaryCss,
        js: primaryJs
      },
      {
        id: 'icon',
        name: 'Icon',
        html: iconHtml,
        css: iconCss,
        js: iconJs
      },
      {
        id: 'secondary',
        name: 'Secondary',
        html: secondaryHtml,
        css: secondaryCss,
        js: secondaryJs
      },
      {
        id: 'outline',
        name: 'Outline',
        html: outlineHtml,
        css: outlineCss,
        js: outlineJs
      },
      {
        id: 'outline-secondary',
        name: 'Outline Secondary',
        html: outlineSecondaryHtml,
        css: outlineSecondaryCss,
        js: outlineSecondaryJs
      },
      {
        id: 'transparent',
        name: 'Transparent',
        html: transparentHtml,
        css: transparentCss,
        js: transparentJs
      },
      {
        id: 'ai-insights',
        name: 'AI Insights',
        html: aiInsightsHtml,
        css: aiInsightsCss,
        js: aiInsightsJs
      }
    ]
  },
  {
    id: 'card',
    name: 'Card',
    description: 'A container component for organizing related content.',
    variants: [
      {
        id: 'basic',
        name: 'Basic Card',
        html: cardBasicHtml,
        css: cardBasicCss
      }
    ]
  },
  {
    id: 'link',
    name: 'Link',
    description: 'Text links for navigation or secondary actions.',
    variants: [
      {
        id: 'base',
        name: 'Base',
        html: linkBaseHtml,
        css: linkBaseCss
      },
      {
        id: 'active-on-hover',
        name: 'Active on Hover',
        html: linkActiveHoverHtml,
        css: linkActiveHoverCss
      }
    ]
  }
];
