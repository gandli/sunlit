/**
 * DOM invariants — see SPEC.md §1
 * All framework/* branches must satisfy these counts.
 */
export const INVARIANTS = {
  '#dappled-light': 1,
  '#dappled-light > #glow': 1,
  '#dappled-light > #glow-bounce': 1,
  '#dappled-light > .perspective': 1,
  '.perspective > #leaves': 1,
  '#leaves svg defs filter#wind': 1,
  '#wind feTurbulence': 1,
  '#wind feDisplacementMap': 1,
  '.perspective > #blinds': 1,
  '#blinds > .shutters > .shutter': 23,
  '#blinds > .vertical > .bar': 2,
  '#progressive-blur > div': 4,
  'article h1': 1,
  'article p a': 3,
  'article pre code': 1,
};

/**
 * CSS custom properties on <body> — see SPEC.md §2
 */
export const CSS_TOKENS_LIGHT = {
  '--day': 'rgb(255, 253, 250)',
  '--evening': 'rgb(252, 204, 131)',
  '--dusk': 'rgb(219, 122, 42)',
  '--night': 'rgb(15, 19, 28)',
  '--dawn': 'rgb(22, 19, 43)',
  '--morning': 'rgb(159, 179, 191)',
};

/**
 * Geometry constants — see SPEC.md §3
 */
export const GEOMETRY = {
  article: { maxWidth: '800px' },
  perspective: { top: '-30vh', width: '80vw', height: '130vh' },
  leaves: { width: '1600px', height: '1400px' },
  bar: { width: '5px' }, // ⚠ upstream main has "width: 5;" (bug U1)
  shutterDayHeight: '40px',
  shutterDarkHeight: '80px',
  shuttersDayGap: '60px',
  shuttersDarkGap: '20px',
};
