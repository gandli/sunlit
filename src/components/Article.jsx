/**
 * Article — h1 × 1, p a × 3, pre code × 1 (SPEC §1)
 */
export default function Article() {
  return (
    <article>
      <h1>sunlit</h1>
      <p>
        inspired by <a href="https://daylightcomputer.com">daylight computer</a>
        {' '}and <a href="https://chloe.place">chloe yan's</a>
        {' '}<a href="https://sunlit.place">sunlit place</a>.
      </p>
      <pre><code>[press SPACE to toggle the sun]</code></pre>
    </article>
  );
}
