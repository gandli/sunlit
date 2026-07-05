/**
 * ProgressiveBlur — 4 stacked blur layers (SPEC §1).
 */
import { For } from 'solid-js';

export default function ProgressiveBlur() {
  const layers = Array.from({ length: 4 }, (_, i) => i);
  return (
    <div id="progressive-blur" aria-hidden="true">
      <For each={layers}>{() => <div class="blur-layer" />}</For>
    </div>
  );
}
