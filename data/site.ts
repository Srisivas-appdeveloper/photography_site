/**
 * ALL site content lives here. Edit text, links and images in one place.
 *
 * IMAGES: `src` can be
 *   - a local file:  '/images/optimized/quiet-vows.jpg'  (run `npm run optimize` first)
 *   - a remote URL:  any https://images.unsplash.com/... (placeholder only)
 * Next.js <Image> converts every image to AVIF/WebP and serves the right size per device.
 */

export type Category = 'weddings' | 'baby-shower' | 'baby-shoots' | 'fashion' | 'editorials' | 'celebrities' | 'commercial' | 'corporate' | 'television';

export type Photo = {
  src: string;
  alt: string;
  title: string;
  category: Category;
  /** width / height of the original, used to reserve space (no layout shift) */
  w: number;
  h: number;
};

export type Reel = {
  id: string;
  title: string;
  tag: string;
  videoSrc: string;
  posterSrc: string;
  duration: string;
};

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2400&q=80`;

export const site = {
  name: 'Leo Picturez',
  tagline: 'The Art Behind the Lens',
  slogan: 'Where every frame becomes a story.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://leopicturez.com',
  email: 'Info@leopicturez.com',
  phone: '+91 74483 14899',
  phoneHref: 'tel:+917448314899',
  instagram: 'https://www.instagram.com/leo_picturez?cplk=ZXExZm5yanRiazR4&utm_source=qr',
  instagramHandle: '@leo_picturez',
  location: 'Chennai, Tamil Nadu',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/leo_picturez?cplk=ZXExZm5yanRiazR4&utm_source=qr' },
    { label: 'Facebook', href: 'https://www.facebook.com/share/1QCJSSjm73/?mibextid=wwXIfr' },
    { label: 'YouTube', href: 'https://youtube.com/@leo_picturez?si=C7seKWo84mtR21fF' },
  ],
  showreel: process.env.NEXT_PUBLIC_SHOWREEL_URL || '',
};

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'reels', label: 'Fashion Reels' },
  { id: 'services', label: 'Services' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

// REPLACE all images with real Leo Picturez work.
export const images = {
  hero: { src: '/images/optimized/wedding-01-temple-pigeon-romance.jpg', alt: 'South Indian wedding couple in traditional silk attire smiling before temple gopuram with flying doves' },
  founder: { src: '/images/optimized/founder-leo.jpg', alt: 'Leo - Founder, Creative Director & Lead Photographer at Leo Picturez' },
  aboutMain: { src: '/images/optimized/celebrity-01-warm-amber-portrait.jpg', alt: 'Celebrity photoshoot with expressive styling' },
  aboutDetail: { src: '/images/optimized/television-02-finger-hearts-camaraderie.jpg', alt: 'Vijay Television production artists on studio set' },
  behindScenes: { src: '/images/optimized/television-07-anchor-mic-presentation.jpg', alt: 'TV production on set shoot with host' },
  showreel: { src: '/images/optimized/television-01-sound-party-host-stage.jpg', alt: 'Vijay TV Sound Party show production stills' },
};

export const fashionReels: Reel[] = [
  {
    id: 'fashion-reel-1',
    title: 'Avant-Garde Lookbook',
    tag: 'Fashion Editorial',
    videoSrc: '/fashion_reels/optimized/fashion-editorial-reel-1.mp4',
    posterSrc: '/images/optimized/fashion-reel-1-cover.jpg',
    duration: '0:23',
  },
  {
    id: 'fashion-reel-2',
    title: 'Sculptural Silhouette',
    tag: 'High Fashion & Form',
    videoSrc: '/fashion_reels/optimized/fashion-editorial-reel-2.mp4',
    posterSrc: '/images/optimized/fashion-reel-2-cover.jpg',
    duration: '0:28',
  },
  {
    id: 'fashion-reel-3',
    title: 'Cinematic Fashion Reel',
    tag: 'Editorial Motion by Leo',
    videoSrc: '/fashion_reels/optimized/leo-fashion-cinematic-reel.mp4',
    posterSrc: '/images/optimized/fashion-reel-3-cover.jpg',
    duration: '0:37',
  },
  {
    id: 'fashion-reel-4',
    title: 'Couture in Motion',
    tag: 'Behind The Lens & Stills',
    videoSrc: '/fashion_reels/optimized/couture-motion-reel-3.mp4',
    posterSrc: '/images/optimized/fashion-reel-4-cover.jpg',
    duration: '0:40',
  },
];

export const portfolio: Photo[] = [
  // Television & Media Production
  { src: '/images/optimized/television-01-sound-party-host-stage.jpg', alt: 'Vijay Television Sound Party host on stage with energetic pose', title: 'Sound Party Vijay TV', category: 'television', w: 2560, h: 3840 },
  { src: '/images/optimized/television-02-finger-hearts-camaraderie.jpg', alt: 'Television artists posing playfully with finger heart gestures on studio set', title: 'Studio Camaraderie', category: 'television', w: 3840, h: 3072 },
  { src: '/images/optimized/television-03-live-stage-excitement.jpg', alt: 'Vijay Television artists and hosts in dynamic stage performance', title: 'Live Show Dynamic', category: 'television', w: 2560, h: 3840 },
  { src: '/images/optimized/television-04-celebrity-guest-stage.jpg', alt: 'Celebrity guest performance on Vijay TV live production stage', title: 'Star Spotlight', category: 'television', w: 2560, h: 3840 },
  { src: '/images/optimized/television-05-studio-production-vibe.jpg', alt: 'Live studio broadcast recording with television hosts and audience', title: 'Broadcast Pulse', category: 'television', w: 2560, h: 3840 },
  { src: '/images/optimized/television-06-cwc-comedy-stage.jpg', alt: 'Television comedy performer bringing laughter to studio stage', title: 'Comedy Showtime', category: 'television', w: 2560, h: 3840 },
  { src: '/images/optimized/television-07-anchor-mic-presentation.jpg', alt: 'Show host holding microphone during televised broadcast segment', title: 'Live Broadcast', category: 'television', w: 2272, h: 3408 },
  { src: '/images/optimized/television-08-purple-dress-stage.jpg', alt: 'Television artist in royal purple attire on stage backdrop', title: 'Royal Stage Presence', category: 'television', w: 2560, h: 3840 },
  { src: '/images/optimized/television-09-celebrity-actor-stills.jpg', alt: 'Celebrity actor on TV stage in lively studio lighting', title: 'On-Screen Persona', category: 'television', w: 2560, h: 3840 },
  { src: '/images/optimized/television-10-sound-party-music-set.jpg', alt: 'Vibrant musical performance stills on Vijay TV Sound Party set', title: 'Sound Party Stage', category: 'television', w: 2560, h: 3840 },
  { src: '/images/optimized/television-11-guest-appearance-smile.jpg', alt: 'Television star smiling warmly during special studio broadcast', title: 'Stage Radiance', category: 'television', w: 2560, h: 3840 },
  { src: '/images/optimized/television-12-host-maroon-jacket.jpg', alt: 'Male television host in maroon jacket and mic on TV stage', title: 'Showtime Charisma', category: 'television', w: 2560, h: 3840 },
  { src: '/images/optimized/television-13-black-dress-outdoor.jpg', alt: 'Television celebrity smiling outdoors in textured black dress', title: 'Off-Set Radiance', category: 'television', w: 2560, h: 3840 },

  // Bridal & Weddings
  { src: '/images/optimized/wedding-01-temple-pigeon-romance.jpg', alt: 'Couple in traditional silk attire smiling before temple gopuram with flying doves', title: 'Temple Mandapam Vows', category: 'weddings', w: 2046, h: 3072 },
  { src: '/images/optimized/bridal-01-silk-saree-gold-temple.jpg', alt: 'South Indian bride glowing in silk saree and gold temple jewelry', title: 'Temple Splendor', category: 'weddings', w: 2560, h: 3840 },
  { src: '/images/optimized/wedding-04-mandapam-garland-celebration.jpg', alt: 'Aerial perspective of couple smiling in ornate floral garlands during marriage rites', title: 'Mandapam Garland Joy', category: 'weddings', w: 3072, h: 2046 },
  { src: '/images/optimized/wedding-03-thali-mangalyam-prayer.jpg', alt: 'Bride hands in prayer holding the golden Mangalyam / Thali with white jasmine flowers', title: 'Thali & Jasmine Blessings', category: 'weddings', w: 2560, h: 1706 },
  { src: '/images/optimized/wedding-02-sacred-thread-hand-clasp.jpg', alt: 'Bride and groom holding hands tied with sacred yellow thread with golden bokeh lights', title: 'Sacred Bond', category: 'weddings', w: 2560, h: 2272 },
  { src: '/images/optimized/wedding-05-mudra-ring-exchange.jpg', alt: 'Bride and groom hands holding wedding rings in artistic mudra pose with velvet bangles', title: 'Sacred Ring Exchange', category: 'weddings', w: 2049, h: 3072 },
  { src: '/images/optimized/wedding-06-reception-twilight-romance.jpg', alt: 'Couple in royal reception attire holding wedding rings close with tender gaze', title: 'Midnight Royal Romance', category: 'weddings', w: 2046, h: 3072 },
  { src: '/images/optimized/bridal-02-royal-blue-reflection.jpg', alt: 'Bride in royal sapphire blue silk saree with contemporary mirror reflection', title: 'Royal Sapphire', category: 'weddings', w: 2560, h: 3840 },
  { src: '/images/optimized/bridal-03-purple-gown-elegance.jpg', alt: 'Bridal portrait in majestic purple silk gown', title: 'Silk Elegance', category: 'weddings', w: 2560, h: 3840 },
  { src: '/images/optimized/bridal-04-floral-heritage.jpg', alt: 'South Indian bridal styling with traditional floral garland and jewelry', title: 'Heritage Bride', category: 'weddings', w: 2560, h: 3840 },
  { src: '/images/optimized/bridal-05-antique-gold-adornment.jpg', alt: 'Bride adorned in antique heirloom jewelry and traditional silk', title: 'Heirloom Grandeur', category: 'weddings', w: 2560, h: 3840 },

  // Corporate & Events
  { src: '/images/optimized/corporate-01-women-leaders-summit.jpg', alt: 'Women entrepreneurs networking with interactive cards at NCC summit', title: 'Networking Leaders', category: 'corporate', w: 3840, h: 2560 },
  { src: '/images/optimized/corporate-02-executive-team-summit.jpg', alt: 'Corporate leadership team and delegates at business summit', title: 'Executive Summit', category: 'corporate', w: 3840, h: 2560 },
  { src: '/images/optimized/corporate-03-keynote-speaker.jpg', alt: 'Keynote speaker addressing industry leaders at enterprise conference', title: 'Keynote Address', category: 'corporate', w: 3408, h: 2272 },

  // Celebrity
  { src: '/images/optimized/celebrity-01-warm-amber-portrait.jpg', alt: 'Celebrity portrait with expressive eyes in warm amber glow', title: 'Warm Radiance', category: 'celebrities', w: 2272, h: 3408 },
  { src: '/images/optimized/celebrity-02-magenta-editorial.jpg', alt: 'Celebrity actress portrait in magenta outfit with statement earrings', title: 'Media Presence', category: 'celebrities', w: 2560, h: 3840 },
  { src: '/images/optimized/celebrity-03-denim-urban-chic.jpg', alt: 'Celebrity portrait in black top and denim styling', title: 'Urban Screen', category: 'celebrities', w: 2560, h: 3840 },
  { src: '/images/optimized/celebrity-04-contemporary-mood.jpg', alt: 'Expressive celebrity portrait with moody atmospheric lighting', title: 'Midnight Drive', category: 'celebrities', w: 2560, h: 3840 },
  { src: '/images/optimized/celebrity-05-studio-glamour.jpg', alt: 'Polished studio fashion portrait of celebrity artist', title: 'Golden Hour Glow', category: 'celebrities', w: 2560, h: 3840 },
  { src: '/images/optimized/celebrity-06-red-dress-radiance.jpg', alt: 'Celebrity with beaming smile in striking red attire', title: 'Radiant Charm', category: 'celebrities', w: 3840, h: 3072 },
  { src: '/images/optimized/celebrity-07-cinematic-stills.jpg', alt: 'Cinematic portrait with dramatic lighting and poise', title: 'Free Spirit', category: 'celebrities', w: 2560, h: 3840 },

  // Baby Shower / Maternity
  { src: '/images/optimized/baby-shower-01-coastal-embrace.jpg', alt: 'Expecting couple embracing warmly on the beach shore', title: 'Coastal Whispers', category: 'baby-shower', w: 2560, h: 3840 },
  { src: '/images/optimized/baby-shower-02-maternity-portrait.jpg', alt: 'Expectant mother in royal violet gown holding baby bump', title: 'Gentle Heartbeats', category: 'baby-shower', w: 2560, h: 3840 },
  { src: '/images/optimized/baby-shower-03-traditional-seemantham.jpg', alt: 'Traditional Seemantham baby shower ceremony with family celebrations', title: 'Seemantham Glow', category: 'baby-shower', w: 3840, h: 2560 },
  { src: '/images/optimized/baby-shower-04-violet-gown-grace.jpg', alt: 'Mother-to-be posing elegantly in flowy violet maternity gown', title: 'Grace in Violet', category: 'baby-shower', w: 2560, h: 3840 },
  { src: '/images/optimized/baby-shower-05-family-celebration.jpg', alt: 'Warm family blessings and ceremonial shower rituals', title: 'Heart of Motherhood', category: 'baby-shower', w: 3840, h: 2560 },
  { src: '/images/optimized/baby-shower-06-beach-twilight.jpg', alt: 'Maternity couple strolling along beach sands during sunset', title: 'Twilight Shoreline', category: 'baby-shower', w: 3840, h: 2560 },

  // Baby Shoot
  { src: '/images/optimized/baby-shoot-01-little-princess.jpg', alt: 'Baby in a pink dress on a green background', title: 'Little Princess', category: 'baby-shoots', w: 3408, h: 2272 },

  // Fashion & Western Couture
  { src: '/images/optimized/fashion-01-chartreuse-fan-collar.jpg', alt: 'Model in sculptural chartreuse fan-collar couture gown', title: 'Solar Silhouette', category: 'fashion', w: 3072, h: 3840 },
  { src: '/images/optimized/fashion-02-black-lace-corset.jpg', alt: 'Chic portrait in tailored black gown with lace corset detail', title: 'Noir Elegance', category: 'fashion', w: 2560, h: 3840 },
  { src: '/images/optimized/fashion-03-curly-hair-stylized.jpg', alt: 'High-fashion model with curls in contemporary western styling', title: 'Amber Hues', category: 'fashion', w: 3072, h: 3840 },
  { src: '/images/optimized/fashion-04-black-evening-gown.jpg', alt: 'Evening photoshoot in shimmering black backless gown', title: 'Midnight Bloom', category: 'fashion', w: 2560, h: 3840 },

  // Lehenga & Traditional Couture
  { src: '/images/optimized/fashion-05-teal-mirrored-lehenga.jpg', alt: 'Model in turquoise teal mirrored couture lehenga', title: 'Mirrored Teal', category: 'fashion', w: 2560, h: 3840 },
  { src: '/images/optimized/fashion-06-wine-maroon-royalty.jpg', alt: 'Model in rich wine embroidered lehenga with vintage chandelier set', title: 'Velvet Royalty', category: 'fashion', w: 2560, h: 3840 },
  { src: '/images/optimized/fashion-07-emerald-green-velvet.jpg', alt: 'Model in emerald green velvet embroidered lehenga blouse', title: 'Emerald Velvet', category: 'fashion', w: 2880, h: 3840 },
  { src: '/images/optimized/fashion-08-ivory-blush-couture.jpg', alt: 'Bridal couture model seated in ivory blush embellished lehenga', title: 'Ivory Luxe', category: 'fashion', w: 2560, h: 3840 },
  { src: '/images/optimized/fashion-09-champagne-sequin-shimmer.jpg', alt: 'Model in champagne sequin lehenga framed by antique wooden doorway', title: 'Champagne Shimmer', category: 'fashion', w: 2560, h: 3840 },

  // Editorials & Creative Concepts
  { src: '/images/optimized/editorial-01-silver-foil-reflection.jpg', alt: 'Avant-garde editorial shoot of a model framed by reflective silver foil', title: 'Metallic Gaze', category: 'editorials', w: 3168, h: 2112 },
  { src: '/images/optimized/editorial-02-contemporary-fashion-art.jpg', alt: 'Creative beauty editorial portrait with threaded fiber art and graphic makeup', title: 'Woven Identity', category: 'editorials', w: 2272, h: 3408 },
];

export const filters: { id: 'all' | Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'television', label: 'Television & Media' },
  { id: 'weddings', label: 'Bridal & Weddings' },
  { id: 'fashion', label: 'Fashion & Western' },
  { id: 'celebrities', label: 'Celebrities' },
  { id: 'baby-shower', label: 'Baby Shower' },
  { id: 'baby-shoots', label: 'Baby Shoots' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'editorials', label: 'Editorials' },
  { id: 'commercial', label: 'Commercial' },
];

export const categories = [
  {
    title: 'Television & Media Stills',
    text: 'On-set production, broadcast shows, reality TV and celebrity promo stills.',
    img: { src: '/images/optimized/television-01-sound-party-host-stage.jpg', alt: 'Vijay Television Sound Party host on set', title: 'Sound Party Vijay TV', category: 'television' as Category, w: 2560, h: 3840 },
    tint: 'mint' as const,
  },
  {
    title: 'Wedding & Bridal Stories',
    text: 'Timeless South Indian bridal aesthetics and emotional wedding rituals.',
    img: { src: '/images/optimized/bridal-01-silk-saree-gold-temple.jpg', alt: 'South Indian bride glowing in silk saree', title: 'Temple Splendor', category: 'weddings' as Category, w: 2560, h: 3840 },
    tint: 'blush' as const,
  },
  {
    title: 'Fashion & Western Couture',
    text: 'High-fashion lookbooks, avant-garde couture, and contemporary styling.',
    img: { src: '/images/optimized/fashion-01-chartreuse-fan-collar.jpg', alt: 'Model in sculptural chartreuse gown', title: 'Solar Silhouette', category: 'fashion' as Category, w: 3072, h: 3840 },
    tint: 'lavender' as const,
  },
  {
    title: 'Celebrity & Commercial',
    text: 'Bold visual storytelling for celebrities, brands and campaigns.',
    img: { src: '/images/optimized/celebrity-06-red-dress-radiance.jpg', alt: 'Celebrity portrait on set in striking red attire', title: 'Radiant Charm', category: 'celebrities' as Category, w: 3840, h: 3072 },
    tint: 'mint' as const,
  },
];

export const stats = [
  { value: 8, pad: 2, suffix: '+', label: 'Years of experience' },
  { value: 700, suffix: '+', label: 'Weddings' },
  { value: 500, suffix: '+', label: 'Fashion events' },
  { text: 'Tamil Nadu & Beyond', label: 'Across India' },
] as const;

export const services = [
  { title: 'Television & Media', text: 'Official on-set stills, broadcast promotions, and celebrity reality show coverage.', icon: 'camera' },
  { title: 'Wedding Photography', text: 'Full-day storytelling from first rituals to last dance.', icon: 'rings' },
  { title: 'Celebrity Photography', text: 'Polished portraits and on-set coverage with a cinematic eye.', icon: 'camera' },
  { title: 'Baby Shower & Maternity', text: 'Tender celebrations of new life, motherhood, and family love.', icon: 'person' },
  { title: 'Baby & Kids Shoots', text: 'Delightful milestone moments and heartwarming portraits.', icon: 'star' },
  { title: 'Fashion Photography', text: 'Lookbooks, events and styled shoots with contemporary edge.', icon: 'star' },
  { title: 'Model Portfolio', text: 'Confident portfolios for new and working models.', icon: 'person' },
  { title: 'Commercial & Corporate', text: 'Brand, summit and campaign imagery that sells the story.', icon: 'frame' },
  { title: 'Creative Direction', text: 'Concept, mood, styling and shot planning, start to finish.', icon: 'pen' },
] as const;

export const experience = ['Vijay Television', 'Sound Party', 'Cooku with Comali', 'Celebrities', 'Actors', 'Models', 'Creative Professionals'];

export const testimonials = [
  {
    quote: 'Leo caught moments we didn’t even know were happening. Our baby shower & wedding albums feel like a film we can hold forever.',
    by: 'Priya & Ashwin · Wedding & Maternity',
  },
  {
    quote: 'Calm on set, sharp with direction. My portfolio finally looks international and authentic, and bookings followed.',
    by: 'Ananya Krishnan · Fashion Model',
  },
  {
    quote: 'He understood the brief on day one and delivered a campaign with real mood and polish.',
    by: 'Vignesh Raj · Creative Producer',
  },
  {
    quote: 'Working with Leo for our on-set stills was effortless. His timing during live broadcasts and candid portraits is world-class.',
    by: 'Kavitha Sundar · Media & Production',
  },
];

export const shootTypes = ['Corporate Event / Summit', 'Celebrity Shoot', 'Baby Shower / Maternity', 'Baby & Kids Shoot', 'Wedding', 'Fashion', 'Model Portfolio', 'Commercial', 'Editorial', 'Other'];
