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
        name: 'Primary Button',
        html: `<button class="btn btn-primary" id="primary-btn">Primary Action</button>`,
        css: `.btn {
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}`,
        js: `const primaryBtn = document.getElementById('primary-btn');
if (primaryBtn) {
  primaryBtn.addEventListener('click', () => {
    console.log('Primary button clicked');
    alert('Primary button clicked!');
  });
}`
      },
      {
        id: 'secondary',
        name: 'Secondary Button',
        html: `<button class="btn btn-secondary" id="secondary-btn">Secondary Action</button>`,
        css: `.btn {
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
}

.btn-secondary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}`,
        js: `const secondaryBtn = document.getElementById('secondary-btn');
if (secondaryBtn) {
  secondaryBtn.addEventListener('click', () => {
    console.log('Secondary button clicked');
    alert('Secondary button clicked!');
  });
}`
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
        html: `<div class="card">
  <h3 class="card-title">Card Title</h3>
  <p class="card-body">This is the body content of the card.</p>
</div>`,
        css: `.card {
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.card-title {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-color);
}

.card-body {
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
}`,
        js: `// No dynamic behavior needed for the basic card`
      }
    ]
  }
];
