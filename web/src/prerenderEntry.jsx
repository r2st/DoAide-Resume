// Build-time entry used by scripts/prerender.mjs. Renders one route into the
// jsdom document, with the same tree as main.jsx, so each page's page sets
// its own <head> tags.
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function renderRoute(pathname, container) {
  const root = createRoot(container);
  flushSync(() => {
    root.render(
      <MemoryRouter initialEntries={[pathname]}>
        <App />
      </MemoryRouter>,
    );
  });
  // Pages are lazy-loaded: wait until the markup and title stop changing, so the
  // Suspense fallback has resolved and its head effect has run.
  let last = "";
  for (let i = 0, stable = 0; i < 300 && stable < 15; i++) {
    await sleep(10);
    const now = document.title + container.innerHTML;
    stable = now === last ? stable + 1 : 0;
    last = now;
  }
  return root;
}
