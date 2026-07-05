<!--
  Blinds — 23 horizontal shutters + 2 vertical bars. Counts locked by SPEC §1.
-->
<template>
  <div id="blinds">
    <div class="shutters" aria-hidden="true">
      <div v-for="i in SHUTTER_COUNT" :key="`s${i}`" class="shutter" />
    </div>
    <div class="vertical" aria-hidden="true">
      <div v-for="i in BAR_COUNT" :key="`b${i}`" class="bar" />
    </div>
  </div>
</template>

<script setup>
// SPEC §1 DOM invariants — never change these counts.
const SHUTTER_COUNT = 23;
const BAR_COUNT = 2;
</script>
