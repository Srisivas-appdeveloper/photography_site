import blurMap from '@/data/blur.json';

/**
 * Pastel gradient placeholder shown while a photo loads (tiny inline SVG, ~300 bytes).
 * For local images processed by `npm run optimize`, a real 16px blurred preview
 * of the photo is used instead (generated into data/blur.json).
 */
const tints: Record<string, [string, string]> = {
  blush: ['#F6DDE3', '#FBEADF'],
  lavender: ['#E7E1F7', '#F3E8F4'],
  mint: ['#DCEFE6', '#E9F2F7'],
  peach: ['#FBE4D6', '#F8EEDF'],
};

const svg = (a: string, b: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="20"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="16" height="20" fill="url(#g)"/></svg>`;

const encode = (s: string) =>
  typeof window === 'undefined' ? Buffer.from(s).toString('base64') : window.btoa(s);

export function blurFor(src: string, tint: keyof typeof tints = 'lavender'): string {
  const map = blurMap as Record<string, string>;
  if (map[src]) return map[src];
  const [a, b] = tints[tint] ?? tints.lavender;
  return `data:image/svg+xml;base64,${encode(svg(a, b))}`;
}
