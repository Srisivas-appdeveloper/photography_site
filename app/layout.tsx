import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { site, images } from '@/data/site';
import './globals.css';

// Fonts are bundled in /app/fonts (woff2, latin subset) — no request to Google,
// preloaded automatically, with metric-matched fallbacks to avoid layout shift.
const serif = localFont({
  src: [
    { path: './fonts/cormorant-garamond-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/cormorant-garamond-latin-400-italic.woff2', weight: '400', style: 'italic' },
    { path: './fonts/cormorant-garamond-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/cormorant-garamond-latin-500-italic.woff2', weight: '500', style: 'italic' },
    { path: './fonts/cormorant-garamond-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: './fonts/cormorant-garamond-latin-600-italic.woff2', weight: '600', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});
const sans = localFont({
  src: [
    { path: './fonts/manrope-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/manrope-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/manrope-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: 'Leo Picturez | Fashion & Wedding Photographer in Tamil Nadu',
  description:
    'Leo Picturez is a Fashion & Wedding Photography studio in Chennai, Tamil Nadu. 8+ years, 700+ weddings, 500+ fashion events. Where every frame becomes a story.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: 'Leo Picturez | The Art Behind the Lens',
    description: 'Luxury fashion & wedding photography crafted with cinematic vision and authentic emotion.',
    images: [{ url: images.hero.src, width: 1200, height: 630 }], // REPLACE with a real Leo Picturez image
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#F8F3EE',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Photographer', 'ProfessionalService', 'LocalBusiness'],
  name: site.name,
  slogan: site.slogan,
  description: 'Fashion & wedding photography and creative studio in Tamil Nadu.',
  email: site.email,
  telephone: site.phone,
  areaServed: 'Tamil Nadu, India',
  address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
  sameAs: [site.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <link rel="preload" as="image" href="/images/optimized/bridal-pink-gold-palm-leaves.jpg" fetchPriority="high" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
