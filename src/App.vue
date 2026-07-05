<!--
  App — root component.
  Wires up the SPEC-mandated visual stack + article and initialises the
  interaction contract via useSunToggle().
-->
<template>
  <DappledLight />
  <Article />
</template>

<script setup>
import DappledLight from './components/DappledLight.vue';
import Article from './components/Article.vue';
import { useSunToggle } from './composables/useSunToggle.js';

// Wires document-level keydown + click listeners (SPEC §5).
useSunToggle();
</script>
