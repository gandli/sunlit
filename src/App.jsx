/**
 * App — root component.
 * Click handler on the root <div> satisfies SPEC §5 "any click on document
 * toggles" — click bubbles up here from anywhere in the page.
 */
import DappledLight from './components/DappledLight.jsx';
import Article from './components/Article.jsx';
import { useSunToggle } from './hooks/useSunToggle.js';

export default function App() {
  const { toggle } = useSunToggle();
  return (
    <div onClick={toggle} style={{ minHeight: '100vh' }}>
      <DappledLight />
      <Article />
    </div>
  );
}
