import baseCss from '../base/css';

export default `${baseCss}

.link.link--active-on-hover {
    color: var(--text-color);
    transition: color 0.2s ease;
}

.link.link--active-on-hover:hover {
    color: var(--primary-color);
}`;
