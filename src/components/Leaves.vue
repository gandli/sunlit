<!--
  Leaves — SVG filter (feTurbulence + feDisplacementMap for "wind" distortion)
  plus the tree-leaves background bitmap. Kept as a dedicated component so
  the SVG defs stay adjacent to the element that uses them.
-->
<template>
  <div id="leaves" aria-hidden="true">
    <svg style="position: absolute; width: 0; height: 0" aria-hidden="true">
      <defs>
        <filter id="wind">
          <feTurbulence type="fractalNoise" baseFrequency="0.005 0.01" numOctaves="2">
            <animate attributeName="baseFrequency" dur="16s" values="0.01 0.02;0.02 0.04;0.01 0.02" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="20" />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script setup>
// No script needed — filter + background come from CSS.
</script>
