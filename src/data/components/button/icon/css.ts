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

.button.button--icon {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 9px;
    flex-shrink: 0;

    > img {
        aspect-ratio: 1 / 1;
        height: 20px;
        width: 20px;
        display: block;
    }
}`;
