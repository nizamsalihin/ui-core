export default `.button {
    font: 600 16px/1.2 var(--font-family);
    display: inline-block;
    padding: 9.5px 16px;
    border-radius: var(--border-radius, 4px);
    cursor: pointer;
    text-decoration: none;
    border: 1px solid var(--color-primary);
    background-color: var(--color-primary);
    color: white;
}

.button.button--ai-insights {
    background: radial-gradient(63.75% 63.75% at 50% 50%, var(--color-orange-2) 0%, var(--color-orange-3) 50%, var(--color-primary) 100%);
    border: 1px solid var(--color-orange-4);
    box-shadow: inset 0px 0px 12px 0px white, inset 0px -24px 32px 0px rgba(255,255,255,0.22), inset 0px 8px 24px -16px rgba(255,255,255,0.24);
    color: var(--color-primary-foreground);
    border-radius: var(--border-radius, 4px);
    padding: 10px 16px;
    font-family: var(--font-family);
    font-weight: 700;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    text-shadow: none;
    cursor: pointer;

    &::before {
        content: "";
        display: block;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>');
        background-size: contain;
        background-repeat: no-repeat;
        width: 14px;
        height: 14px;
        aspect-ratio: 1;
    }
}

.button.button--ai-insights:hover {
    filter: brightness(1.1);
}`;
