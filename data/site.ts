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
  email: 'leopicturez@gmail.com',
  phone: '+91 7800 47611',
  phoneHref: 'tel:+917800047611',
  instagram: 'https://instagram.com/leopicturez',
  instagramHandle: '@leopicturez',
  location: 'Chennai, Tamil Nadu',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/leopicturez' },
    { label: 'Facebook', href: 'https://facebook.com/' },
    { label: 'YouTube', href: 'https://youtube.com/' },
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
  hero: { src: '/images/optimized/bridal-pink-gold-palm-leaves.jpg', alt: 'South Indian bride glowing in silk saree and gold temple jewelry' },
  aboutMain: { src: '/images/optimized/celebrity-curly-hair-portrait.jpg', alt: 'Celebrity photoshoot with expressive styling' },
  aboutDetail: { src: '/images/optimized/television-girl-gang-finger-hearts.jpg', alt: 'Vijay Television production artists on studio set' },
  behindScenes: { src: '/images/optimized/television-black-blazer-anchor.jpg', alt: 'TV production on set shoot with host' },
  showreel: { src: '/images/optimized/television-sound-party-host.jpg', alt: 'Vijay TV Sound Party show production stills' },
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
  { src: '/images/optimized/television-sound-party-host.jpg', alt: 'Vijay Television Sound Party host on stage with energetic pose', title: 'Sound Party Vijay TV', category: 'television', w: 682, h: 1024 },
  { src: '/images/optimized/television-girl-gang-finger-hearts.jpg', alt: 'Television artists posing playfully with finger heart gestures on studio set', title: 'Studio Camaraderie', category: 'television', w: 1024, h: 819 },
  { src: '/images/optimized/television-cwc-comedy-performer.jpg', alt: 'Comedy performer in white shirt and traditional angavastram on TV stage', title: 'Comedy Spotlight', category: 'television', w: 682, h: 1024 },
  { src: '/images/optimized/television-purple-stage-portrait.jpg', alt: 'TV celebrity and artist in royal purple attire on stage backdrop', title: 'Royal Stage Presence', category: 'television', w: 682, h: 1024 },
  { src: '/images/optimized/television-maroon-jacket-host.jpg', alt: 'Male television host in maroon jacket and mic on Sound Party stage', title: 'Showtime Charisma', category: 'television', w: 682, h: 1024 },
  { src: '/images/optimized/television-cream-floral-stage.jpg', alt: 'Vijay TV artist on live set stage in floral top', title: 'Stage Spotlight', category: 'television', w: 682, h: 1024 },
  { src: '/images/optimized/television-blue-shirt-stage.jpg', alt: 'Celebrity actor on TV stage in casual blue shirt', title: 'On-Screen Persona', category: 'television', w: 682, h: 1024 },
  { src: '/images/optimized/television-pink-salwar-stage.jpg', alt: 'TV actress and artist on set in pastel pink attire', title: 'Stage Radiance', category: 'television', w: 682, h: 1024 },
  { src: '/images/optimized/television-black-blazer-anchor.jpg', alt: 'TV show anchor in embroidered black blazer with earpiece microphone', title: 'Live Broadcast', category: 'television', w: 682, h: 1024 },
  { src: '/images/optimized/television-black-dress-outdoor-portrait.jpg', alt: 'TV star smiling outdoors in textured black dress', title: 'Off-Set Radiance', category: 'television', w: 682, h: 1024 },
  { src: '/images/optimized/television-magenta-dress-curls.jpg', alt: 'TV celebrity and actress portrait with statement geometric earrings', title: 'Media Presence', category: 'television', w: 682, h: 1024 },
  { src: '/images/optimized/television-black-top-denim-fashion.jpg', alt: 'TV celebrity portrait in black top and denim styling', title: 'Urban Screen', category: 'television', w: 682, h: 1024 },
  { src: '/images/optimized/television-sound-party-black-dress.jpg', alt: 'Celebrity guest on Vijay TV Sound Party set in elegant black dress', title: 'Sound Party Star', category: 'television', w: 682, h: 1024 },

  // Bridal & Weddings
  { src: '/images/optimized/bridal-pink-gold-palm-leaves.jpg', alt: 'South Indian bride in radiant pink and gold silk saree', title: 'Emerald Grace', category: 'weddings', w: 682, h: 1024 },
  { src: '/images/optimized/bridal-pink-purple-temple-jewelry.jpg', alt: 'Bride adorned in majestic temple jewelry and silk saree', title: 'Temple Grandeur', category: 'weddings', w: 682, h: 1024 },
  { src: '/images/optimized/bridal-gold-pink-floor-mirror.jpg', alt: 'Bride sitting elegantly with antique mirror and pampas decor', title: 'Silk Elegance', category: 'weddings', w: 682, h: 1024 },
  { src: '/images/optimized/bridal-royal-blue-glass.jpg', alt: 'Bride in royal sapphire blue silk saree with modern reflection', title: 'Royal Sapphire', category: 'weddings', w: 682, h: 1024 },
  { src: '/images/optimized/bridal-gold-pillar-traditional.jpg', alt: 'Heritage bridal portrait by traditional wooden architectural column', title: 'Heritage Bride', category: 'weddings', w: 682, h: 1024 },

  // Corporate & Events
  { src: '/images/optimized/corporate-ncc-launchpad-team.jpg', alt: 'Corporate leadership and delegates group photo at Launch Pad 25', title: 'Executive Summit', category: 'corporate', w: 1024, h: 682 },
  { src: '/images/optimized/corporate-women-entrepreneurs-networking.jpg', alt: 'Women entrepreneurs networking with interactive message cards at NCC summit', title: 'Networking Leaders', category: 'corporate', w: 1024, h: 682 },
  { src: '/images/optimized/corporate-summit-speaker.jpg', alt: 'Keynote speaker addressing the audience at business summit', title: 'Keynote Address', category: 'corporate', w: 1024, h: 682 },

  // Celebrity
  { src: '/images/optimized/celebrity-curly-hair-portrait.jpg', alt: 'Celebrity posing with curls in contemporary styling', title: 'Free Spirit', category: 'celebrities', w: 819, h: 1024 },
  { src: '/images/optimized/celebrity-balcony-golden-gown.jpg', alt: 'Celebrity in golden dress under dramatic cinematic lighting', title: 'Golden Hour Glow', category: 'celebrities', w: 1024, h: 819 },
  { src: '/images/optimized/celebrity-car-window-mood.jpg', alt: 'Moody portrait of an actress looking through a car window', title: 'Midnight Drive', category: 'celebrities', w: 682, h: 1024 },
  { src: '/images/optimized/celebrity-red-dress-portrait.jpg', alt: 'Celebrity with radiant smile in red outfit', title: 'Radiant Charm', category: 'celebrities', w: 682, h: 1024 },
  { src: '/images/optimized/celebrity-silk-saree-traditional.jpg', alt: 'Celebrity in luxurious pink and gold silk saree', title: 'Royal Heritage', category: 'celebrities', w: 682, h: 1024 },

  // Baby Shower / Maternity
  { src: '/images/optimized/baby-shower-listening.jpg', alt: 'Father listening to baby bump in purple dress', title: 'Gentle Heartbeats', category: 'baby-shower', w: 1024, h: 682 },
  { src: '/images/optimized/baby-shower-beach-couple.jpg', alt: 'Expecting couple embracing warmly on the beach shore', title: 'Coastal Whispers', category: 'baby-shower', w: 682, h: 1024 },
  { src: '/images/optimized/baby-shower-purple-gown.jpg', alt: 'Expectant mother posing gracefully in flowy purple gown', title: 'Grace in Violet', category: 'baby-shower', w: 682, h: 1024 },
  { src: '/images/optimized/baby-shower-traditional-saree.jpg', alt: 'Mother glowing in traditional golden silk saree and jewelry', title: 'Seemantham Glow', category: 'baby-shower', w: 682, h: 1024 },
  { src: '/images/optimized/baby-shower-heart-hands.jpg', alt: 'Hands with traditional mehndi forming a heart over baby bump', title: 'Heart of Motherhood', category: 'baby-shower', w: 1024, h: 682 },

  // Baby Shoot
  { src: '/images/optimized/baby-shoot-1.jpg', alt: 'Baby in a pink dress on a green background', title: 'Little Princess', category: 'baby-shoots', w: 1024, h: 682 },

  // Fashion & Western Couture
  { src: '/images/optimized/western-chartreuse-sculptural-gown.jpg', alt: 'Model in sculptural chartreuse fan-collar couture gown', title: 'Solar Silhouette', category: 'fashion', w: 819, h: 1024 },
  { src: '/images/optimized/western-black-lace-corset.jpg', alt: 'Chic portrait in tailored black gown with lace corset detail', title: 'Noir Elegance', category: 'fashion', w: 682, h: 1024 },
  { src: '/images/optimized/western-black-evening-gown.jpg', alt: 'Evening photoshoot in shimmering black backless gown', title: 'Midnight Bloom', category: 'fashion', w: 682, h: 1024 },
  { src: '/images/optimized/western-amber-shirt-portrait.jpg', alt: 'Contemporary fashion portrait in warm amber light and relaxed shirt styling', title: 'Amber Hues', category: 'fashion', w: 682, h: 1024 },

  // Lehenga & Traditional Couture
  { src: '/images/optimized/lehenga-wine-maroon-chandelier.jpg', alt: 'Model in rich wine embellished lehenga with vintage chandelier set', title: 'Velvet Royalty', category: 'fashion', w: 682, h: 1024 },
  { src: '/images/optimized/lehenga-teal-mirrored-glamour.jpg', alt: 'Model in turquoise teal mirrored lehenga', title: 'Mirrored Teal', category: 'fashion', w: 682, h: 1024 },
  { src: '/images/optimized/lehenga-ivory-blush-seated.jpg', alt: 'Bridal couture model seated in ivory blush embellished lehenga', title: 'Ivory Luxe', category: 'fashion', w: 682, h: 1024 },
  { src: '/images/optimized/lehenga-champagne-sequin-doorway.jpg', alt: 'Model in champagne sequin lehenga framed by vintage wooden doorway', title: 'Champagne Shimmer', category: 'fashion', w: 682, h: 1024 },
  { src: '/images/optimized/lehenga-emerald-green-velvet.jpg', alt: 'Model in emerald green velvet embroidered lehenga blouse', title: 'Emerald Velvet', category: 'fashion', w: 768, h: 1024 },

  // Editorials & Creative Concepts
  { src: '/images/optimized/editorial-silver-foil-tear.jpg', alt: 'Avant-garde editorial shoot of a model framed by reflective silver foil', title: 'Metallic Gaze', category: 'editorials', w: 1024, h: 682 },
  { src: '/images/optimized/editorial-tricolor-yarn-art.jpg', alt: 'Creative beauty editorial portrait with threaded fiber art and graphic makeup', title: 'Woven Identity', category: 'editorials', w: 682, h: 1024 },
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
    img: { src: '/images/optimized/television-sound-party-host.jpg', alt: 'Vijay Television Sound Party host on set', title: 'Sound Party Vijay TV', category: 'television' as Category, w: 682, h: 1024 },
    tint: 'mint' as const,
  },
  {
    title: 'Wedding & Bridal Stories',
    text: 'Timeless South Indian bridal aesthetics and emotional wedding rituals.',
    img: { src: '/images/optimized/bridal-pink-gold-palm-leaves.jpg', alt: 'South Indian bride glowing in silk saree', title: 'Emerald Grace', category: 'weddings' as Category, w: 682, h: 1024 },
    tint: 'blush' as const,
  },
  {
    title: 'Fashion & Western Couture',
    text: 'High-fashion lookbooks, avant-garde couture, and contemporary styling.',
    img: { src: '/images/optimized/western-chartreuse-sculptural-gown.jpg', alt: 'Model in sculptural chartreuse gown', title: 'Solar Silhouette', category: 'fashion' as Category, w: 819, h: 1024 },
    tint: 'lavender' as const,
  },
  {
    title: 'Celebrity & Commercial',
    text: 'Bold visual storytelling for celebrities, brands and campaigns.',
    img: { src: '/images/optimized/celebrity-balcony-golden-gown.jpg', alt: 'Celebrity portrait on set in golden gown', title: 'Golden Hour Muse', category: 'celebrities' as Category, w: 1024, h: 819 },
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

// SAMPLE quotes: replace with real client testimonials before launch.
export const testimonials = [
  { quote: 'Leo caught moments we didn’t even know were happening. Our baby shower & wedding albums feel like a film we can hold.', by: 'Sample · Baby Shower client' },
  { quote: 'Calm on set, sharp with direction. My portfolio finally looks like me, and bookings followed.', by: 'Sample · Fashion model' },
  { quote: 'He understood the brief on day one and delivered a campaign with real mood and polish.', by: 'Sample · Creative client' },
];

export const shootTypes = ['Corporate Event / Summit', 'Celebrity Shoot', 'Baby Shower / Maternity', 'Baby & Kids Shoot', 'Wedding', 'Fashion', 'Model Portfolio', 'Commercial', 'Editorial', 'Other'];
