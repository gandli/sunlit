import Leaves from './Leaves.jsx';
import Blinds from './Blinds.jsx';
import ProgressiveBlur from './ProgressiveBlur.jsx';

export default function DappledLight() {
  return (
    <div id="dappled-light">
      <div id="glow" />
      <div id="glow-bounce" />
      <div class="perspective">
        <Leaves />
        <Blinds />
      </div>
      <ProgressiveBlur />
    </div>
  );
}
