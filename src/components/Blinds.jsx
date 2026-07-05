/**
 * Blinds — 23 horizontal shutters + 2 vertical bars (SPEC §1).
 */
import { For } from 'solid-js';

export default function Blinds() {
  const shutters = Array.from({ length: 23 }, (_, i) => i);
  const bars = Array.from({ length: 2 }, (_, i) => i);

  return (
    <div id="blinds">
      <div class="shutters" aria-hidden="true">
        <For each={shutters}>{() => <div class="shutter" />}</For>
      </div>
      <div class="vertical" aria-hidden="true">
        <For each={bars}>{() => <div class="bar" />}</For>
      </div>
    </div>
  );
}
