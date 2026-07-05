<!--
  DappledLight — top-level compositor (SPEC §1).
-->
<script>
  import Leaves from './Leaves.svelte';
  import Blinds from './Blinds.svelte';
  import ProgressiveBlur from './ProgressiveBlur.svelte';
</script>

<div id="dappled-light">
  <div id="glow"></div>
  <div id="glow-bounce"></div>
  <div class="perspective">
    <Leaves />
    <Blinds />
  </div>
  <ProgressiveBlur />
</div>
