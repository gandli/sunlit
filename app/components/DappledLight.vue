<!--
  DappledLight — top-level compositor.
  Structure locked by SPEC §1:
    #dappled-light
      > #glow
      > #glow-bounce
      > .perspective
          > #leaves (with SVG defs #wind)
          > #blinds
      > #progressive-blur
-->
<template>
  <div id="dappled-light" aria-hidden="true">
    <div id="glow" />
    <div id="glow-bounce" />
    <div class="perspective">
      <Leaves />
      <Blinds />
    </div>
    <ProgressiveBlur />
  </div>
</template>

<script setup>
import Leaves from './Leaves.vue';
import Blinds from './Blinds.vue';
import ProgressiveBlur from './ProgressiveBlur.vue';
</script>
