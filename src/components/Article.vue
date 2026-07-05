<!--
  Article — page copy, mirrors upstream index.html <article> DOM shape.
  SPEC §1 invariants: article h1 × 1, article p a × 3, article pre code × 1.
-->
<template>
  <article>
    <h1>sunlit</h1>
    <p>
      inspired by
      <a href="https://daylightcomputer.com/" target="_blank" rel="noopener">daylight computer</a>
      and
      <a href="https://www.chloeyan.me/" target="_blank" rel="noopener">chloe yan's</a>
      <a href="https://www.sunlit.place/" target="_blank" rel="noopener">sunlit place</a>
    </p>
    <pre>[press <code>space</code> to toggle the sun]</pre>
  </article>
</template>

<script setup>
// Content only; no dynamic behavior here.
</script>
