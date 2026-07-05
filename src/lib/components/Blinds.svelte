<!--
  Blinds — 23 horizontal shutters + 2 vertical bars (SPEC §1).
-->
<script>
  const SHUTTER_COUNT = 23;
  const BAR_COUNT = 2;
  const shutters = Array.from({ length: SHUTTER_COUNT }, (_, i) => i);
  const bars = Array.from({ length: BAR_COUNT }, (_, i) => i);
</script>

<div id="blinds">
  <div class="shutters" aria-hidden="true">
    {#each shutters as i (i)}
      <div class="shutter"></div>
    {/each}
  </div>
  <div class="vertical" aria-hidden="true">
    {#each bars as i (i)}
      <div class="bar"></div>
    {/each}
  </div>
</div>
