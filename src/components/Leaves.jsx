/**
 * Leaves — SVG wind filter + foliage bitmap.
 * Matches Vue implementation's DOM shape.
 */
export default function Leaves() {
  return (
    <div id="leaves" aria-hidden="true">
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="wind">
            <feTurbulence type="fractalNoise" baseFrequency="0.005 0.01" numOctaves="2">
              <animate
                attributeName="baseFrequency"
                dur="16s"
                values="0.01 0.02;0.02 0.04;0.01 0.02"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
