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

export interface ComponentVariant {
  id: string;
  name: string;
  html: string;
  css: string;
  js: string;
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
        html: `<div class="card">\n  <h3 class="card-title">Card Title</h3>\n  <p class="card-body">This is the body content of the card.</p>\n</div>`,
        css: `.card {\n  background-color: var(--bg-color);\n  border: 1px solid var(--border-color);\n  border-radius: var(--border-radius);\n  padding: 1.5rem;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);\n  transition: box-shadow 0.3s ease;\n}\n\n.card:hover {\n  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);\n}\n\n.card-title {\n  margin-bottom: 0.5rem;\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: var(--text-color);\n}\n\n.card-body {\n  color: #666;\n  font-size: 1rem;\n  line-height: 1.5;\n}`,
        js: `// No dynamic behavior needed for the basic card`
      }
    ]
  }
];
