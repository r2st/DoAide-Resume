import { useEffect } from 'react';

// Sets the page's <title> and meta description (and their Open Graph twins).
// scripts/prerender.mjs bakes whatever this writes into the page's static HTML.
export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    for (const [attr, key, value] of [
      ['name', 'description', description],
      ['property', 'og:title', title],
      ['property', 'og:description', description],
    ]) {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    }
  }, [title, description]);
}
