export default `.card {
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
}`;
