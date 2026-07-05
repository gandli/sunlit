import { onMount, onCleanup } from 'solid-js';
import DappledLight from './components/DappledLight.jsx';
import Article from './components/Article.jsx';
import { useSunToggle } from './hooks/useSunToggle.js';

export default function App() {
  const { toggle, attach } = useSunToggle();

  // Solid's onMount runs after DOM but is scheduled synchronously —
  // for Playwright test stability, this attaches before goto returns.
  onMount(() => {
    const cleanup = attach();
    onCleanup(cleanup);
  });

  return (
    <div class="app-root" onClick={toggle} style={{ 'min-height': '100vh' }}>
      <DappledLight />
      <Article />
    </div>
  );
}
