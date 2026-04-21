export default `.card {
    background-color: var(--bg-card);
    color: var(--primary-foreground);
    border-radius: 8px;
    box-shadow: var(--card-shadow);
    padding: 16px;
    transition: background-color .2s ease, box-shadow .2s ease;
}

.card__value {
    font: 600 32px/1.2 var(--font-primary);
}

.card__icon-wrapper {
    width: 24px;
    height: 24px;
    display: inline-block;
    user-select: none;
    color: var(--text-muted);
    transition: color .2s ease;
}

.card__unit {
    font-weight: 500;
    font-size: 14px;
}

.card__title {
    font: 600 20px/1.2 var(--font-primary);
    display: flex;
    align-items: center;
    gap: 8px;
}

.card__desc {
    font-size: 14px;
    font-weight: 300;
    color: var(--text-muted);
    line-height: 1.4;
}`;
