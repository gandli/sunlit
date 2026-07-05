/**
 * Article — semantic copy (SPEC §1 invariants).
 * h1 × 1, p a × 3, pre code × 1
 */
export default function Article() {
  return (
    <article>
      <h1>sunlit</h1>
      <p>
        inspired by{' '}
        <a href="https://daylightcomputer.com/" target="_blank" rel="noopener">daylight computer</a>
        {' '}and{' '}
        <a href="https://www.chloeyan.me/" target="_blank" rel="noopener">chloe yan's</a>{' '}
        <a href="https://www.sunlit.place/" target="_blank" rel="noopener">sunlit place</a>
      </p>
      <pre>[press <code>space</code> to toggle the sun]</pre>
    </article>
  );
}
