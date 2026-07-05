'use client';
/**
 * App — root Client Component.
 * SSR-safe: no DOM access at module scope; all body.classList writes go
 * through useSunToggle which is called inside useLayoutEffect / handlers.
 *
 * Cross-framework pitfall discipline (SPEC §11):
 *   - 'use client' boundary declared explicitly
 *   - useLayoutEffect attaches keydown listener before Playwright input
 *   - App-root <div onClick> handles bubbled clicks
 *   - Server-rendered HTML has empty <body> → matches SPEC initial state
 *   - suppressHydrationWarning on <body> tolerates classes added by hook
 */
import DappledLight from './components/DappledLight';
import Article from './components/Article';
import { useSunToggle } from './hooks/useSunToggle';

export default function App() {
  const { toggle } = useSunToggle();
  return (
    <div className="app-root" onClick={toggle} style={{ minHeight: '100vh' }}>
      <DappledLight />
      <Article />
    </div>
  );
}
