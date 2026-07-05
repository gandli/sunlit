<!--
  App — root component. Wires up SPEC §5 interaction contract.
-->
<script>
  import DappledLight from './lib/components/DappledLight.svelte';
  import Article from './lib/components/Article.svelte';
  import { useSunToggle } from './lib/useSunToggle.js';

  const { toggle, attach } = useSunToggle();

  // $effect.pre runs synchronously BEFORE paint on mount — matches
  // React useLayoutEffect. Guarantees keydown listener is attached by
  // the time Playwright's page.goto() returns.
  $effect.pre(() => {
    const cleanup = attach();
    return cleanup;
  });
</script>

<div class="app-root" onclick={toggle} style="min-height: 100vh;" role="presentation">
  <DappledLight />
  <Article />
</div>
