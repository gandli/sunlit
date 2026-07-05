/**
 * DappledLight — top-level compositor (SPEC §1).
 */
import Leaves from './Leaves.jsx';
import Blinds from './Blinds.jsx';
import ProgressiveBlur from './ProgressiveBlur.jsx';

export default function DappledLight() {
  return (
    <div id="dappled-light" aria-hidden="true">
      <div id="glow" />
      <div id="glow-bounce" />
      <div className="perspective">
        <Leaves />
        <Blinds />
      </div>
      <ProgressiveBlur />
    </div>
  );
}
