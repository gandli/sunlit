<!--
  ProgressiveBlur — 4 stacked blur layers with different mask stops.
  Count of 4 is a SPEC §1 invariant.
-->
<template>
  <div id="progressive-blur" aria-hidden="true">
    <div v-for="i in BLUR_LAYERS" :key="i" class="blur-layer" />
  </div>
</template>

<script setup>
const BLUR_LAYERS = 4; // SPEC §1
</script>
