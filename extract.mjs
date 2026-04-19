import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'src/data/components/button');
fs.mkdirSync(outDir, { recursive: true });

const baseCss = `.button {
    font: 600 16px/1.2 var(--font-family);
    display: inline-block;
    padding: 9.5px 16px;
    border-radius: var(--border-radius, 4px);
    cursor: pointer;
    text-decoration: none;
    border: 1px solid var(--color-primary);
    background-color: var(--color-primary);
    color: white;
}`;

fs.writeFileSync(path.join(outDir, 'base.css.ts'), `export default \`${baseCss}\`;\n`);

const variants = [
  {
    id: 'primary',
    html: `<button class="button" id="btn-primary">Primary Action</button>`,
    css: `${baseCss}`,
    js: `const btn = document.getElementById('btn-primary');\nif (btn) {\n  btn.addEventListener('click', () => {\n    alert('Primary action triggered!');\n  });\n}`
  },
  {
    id: 'icon',
    html: `<button class="button button--icon" id="btn-icon">\n  <img src="https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/plus.svg" alt="icon" style="filter: invert(1);" />\n  Icon Action\n</button>`,
    css: `${baseCss}\n\n.button.button--icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 5px;\n    padding: 9px;\n    flex-shrink: 0;\n\n    > img {\n        aspect-ratio: 1 / 1;\n        height: 20px;\n        width: 20px;\n        display: block;\n    }\n}`,
    js: `const btnIcon = document.getElementById('btn-icon');\nif (btnIcon) {\n  btnIcon.addEventListener('click', () => {\n    alert('Icon action triggered!');\n  });\n}`
  },
  {
    id: 'secondary',
    html: `<button class="button button--secondary" id="btn-secondary">Secondary Action</button>`,
    css: `${baseCss}\n\n.button.button--secondary {\n    background-color: var(--color-secondary);\n    color: var(--color-secondary-foreground);\n    border-color: var(--color-secondary);\n}`,
    js: `const btnSec = document.getElementById('btn-secondary');\nif (btnSec) {\n  btnSec.addEventListener('click', () => {\n    alert('Secondary action triggered!');\n  });\n}`
  },
  {
    id: 'outline',
    html: `<button class="button button--outline" id="btn-outline">Outline Action</button>`,
    css: `${baseCss}\n\n.button.button--outline {\n    background-color: transparent;\n    color: var(--color-primary);\n    border-color: currentColor;\n}`,
    js: `const btnOut = document.getElementById('btn-outline');\nif (btnOut) {\n  btnOut.addEventListener('click', () => {\n    alert('Outline action triggered!');\n  });\n}`
  },
  {
    id: 'outline-secondary',
    html: `<button class="button button--outline-secondary" id="btn-out-sec">Outline Sec Action</button>`,
    css: `${baseCss}\n\n.button.button--outline-secondary {\n    background-color: transparent;\n    color: var(--color-secondary-foreground);\n    border-color: var(--color-secondary);\n}`,
    js: `const btnOutSec = document.getElementById('btn-out-sec');\nif (btnOutSec) {\n  btnOutSec.addEventListener('click', () => {\n    alert('Outline Secondary action triggered!');\n  });\n}`
  },
  {
    id: 'transparent',
    html: `<button class="button button--transparent" id="btn-transparent">Transparent Action</button>`,
    css: `${baseCss}\n\n.button.button--transparent {\n    border-color: transparent;\n    background-color: transparent;\n    color: var(--color-secondary-foreground);\n}`,
    js: `const btnTrans = document.getElementById('btn-transparent');\nif (btnTrans) {\n  btnTrans.addEventListener('click', () => {\n    alert('Transparent action triggered!');\n  });\n}`
  },
  {
    id: 'ai-insights',
    html: `<button class="button button--ai-insights" id="btn-ai">\n  AI Insights\n</button>`,
    css: `${baseCss}\n\n.button.button--ai-insights {\n    background: radial-gradient(63.75% 63.75% at 50% 50%, var(--color-orange-2) 0%, var(--color-orange-3) 50%, var(--color-primary) 100%);\n    border: 1px solid var(--color-orange-4);\n    box-shadow: inset 0px 0px 12px 0px white, inset 0px -24px 32px 0px rgba(255,255,255,0.22), inset 0px 8px 24px -16px rgba(255,255,255,0.24);\n    color: white;\n    border-radius: var(--border-radius, 4px);\n    padding: 10px 16px;\n    font-family: var(--font-family);\n    font-weight: 700;\n    font-size: 16px;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    text-shadow: none;\n    cursor: pointer;\n\n    &::before {\n        content: "";\n        display: block;\n        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>');\n        background-size: contain;\n        background-repeat: no-repeat;\n        width: 14px;\n        height: 14px;\n        aspect-ratio: 1;\n    }\n}\n\n.button.button--ai-insights:hover {\n    filter: brightness(1.1);\n}`,
    js: `const btnAi = document.getElementById('btn-ai');\nif (btnAi) {\n  btnAi.addEventListener('click', () => {\n    alert('AI Insights triggered!');\n  });\n}`
  }
];

for (const v of variants) {
  // We don't want backticks interpreted in the template literal export
  // But since we are creating files, we can just use writeFileSync and template literals inside the file
  fs.writeFileSync(path.join(outDir, `${v.id}.html.ts`), `export default \`${v.html}\`;\n`);
  fs.writeFileSync(path.join(outDir, `${v.id}.css.ts`), `export default \`${v.css}\`;\n`);
  fs.writeFileSync(path.join(outDir, `${v.id}.js.ts`), `export default \`${v.js}\`;\n`);
}

console.log('Files generated successfully.');
