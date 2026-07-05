<!--
  ProgressiveBlur — 4 stacked blur layers (SPEC §1).
-->
<script>
  const BLUR_LAYERS = 4;
  const layers = Array.from({ length: BLUR_LAYERS }, (_, i) => i);
</script>

<div id="progressive-blur" aria-hidden="true">
  {#each layers as i (i)}
    <div class="blur-layer"></div>
  {/each}
</div>
