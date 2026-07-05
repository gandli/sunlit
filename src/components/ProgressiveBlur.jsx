/**
 * ProgressiveBlur — 4 stacked blur layers (SPEC §1).
 */
const BLUR_LAYERS = 4;

export default function ProgressiveBlur() {
  return (
    <div id="progressive-blur" aria-hidden="true">
      {Array.from({ length: BLUR_LAYERS }, (_, i) => (
        <div key={i} className="blur-layer" />
      ))}
    </div>
  );
}
