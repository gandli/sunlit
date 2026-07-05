/**
 * Blinds — 23 horizontal shutters + 2 vertical bars (SPEC §1).
 */
const SHUTTER_COUNT = 23;
const BAR_COUNT = 2;

export default function Blinds() {
  return (
    <div id="blinds">
      <div className="shutters" aria-hidden="true">
        {Array.from({ length: SHUTTER_COUNT }, (_, i) => (
          <div key={`s${i}`} className="shutter" />
        ))}
      </div>
      <div className="vertical" aria-hidden="true">
        {Array.from({ length: BAR_COUNT }, (_, i) => (
          <div key={`b${i}`} className="bar" />
        ))}
      </div>
    </div>
  );
}
