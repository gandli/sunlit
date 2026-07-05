/**
 * Leaves — SVG wind filter + foliage bitmap.
 */
export default function Leaves() {
  return (
    <div id="leaves" aria-hidden="true">
      <svg style="display: none;">
        <defs>
          <filter id="wind" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" numOctaves="2" seed="1">
              <animate
                attributeName="baseFrequency"
                dur="16s"
                keyTimes="0;0.5;1"
                values="0.01 0.06;0.02 0.08;0.01 0.06"
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
