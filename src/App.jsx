/**
 * App — root component.
 * Preact 10 uses React-compatible hooks via preact/compat.
 * Cross-framework pitfall discipline (SPEC §11):
 *   - useLayoutEffect for keydown listener → attached before Playwright's page.goto returns
 *   - DOM (body.classList) as single source of truth
 *   - Root <div onClick> handles bubbled clicks (no document-level listener)
 */
import DappledLight from './components/DappledLight.jsx';
import Article from './components/Article.jsx';
import { useSunToggle } from './hooks/useSunToggle.js';

export default function App() {
  const { toggle } = useSunToggle();
  return (
    <div className="app-root" onClick={toggle} style={{ minHeight: '100vh' }}>
      <DappledLight />
      <Article />
    </div>
  );
}
