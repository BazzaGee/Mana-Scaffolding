# Components Generated - Phase 02

## Layout Components

### Base Layout (`src/layouts/Base.astro`)
- Fixed navigation with glassmorphism effect
- SEO meta tags
- Reveal-on-scroll animation script
- Global CSS import

## UI Components

### Industrial Slab
- Background: `linear-gradient(145deg, #0f0f0f, #080808)`
- Left border accent: 2px solid primary (#D4441C)
- Hover state: background shifts to darker
- Progress bar animation on hover

### Hero Title
- Display XL font (7.5rem)
- Space Grotesk, all-caps
- Shatter effect on hover (scale 1.1, color shift)
- Tracking tighter

### Service Cards
- Material Symbols icons
- Background: surface (#0f0f0f)
- Industrial slab pattern
- Number watermark (white/5% opacity)

## Section Components

### Hero Section
- Dynamic shatter title
- Scaffolding grid background
- CTA buttons (Primary & Ghost)
- Gradient fade at bottom

### Mana Identity Section
- Two-column layout
- Image with accent box overlay
- Values grid

### International DNA Section
- Director cards
- Grayscale images (hover to color)
- Progress bar animation

### Services Section
- 2x2 grid of service cards
- Residential, Commercial, Industrial, Complex

### Gallery Section
- Horizontal scroll container
- Grayscale images (hover to color)
- Gradient overlay labels

### Contact Section
- Split layout (2:3 ratio)
- Primary color left panel
- Form on right panel

## Styling Patterns

### Colors
- Primary: #D4441C
- Background: #050505
- Surface: #0f0f0f
- Surface Variant: #1a1a1a
- Outline: #2a2a2a

### Typography
- Headlines: Space Grotesk (all-caps, tracking-tighter)
- Body: Manrope
- Labels: 10px-12px, tracking 0.2em-0.4em, uppercase

### Shadows
- Structural: 10px 10px 20px rgba(0,0,0,0.4)
- Glow: 0 0 15px rgba(212,68,28,0.8)
- CTA: 0 10px 30px rgba(212,68,28,0.3)

### Animations
- Reveal on scroll: opacity + translateY
- Ping slow: for status indicators
- Progress bars: width 0 -> 100%

## Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Large: > 1440px

## Generated Files
- `src/layouts/Base.astro` - Base layout
- `src/pages/index.astro` - Homepage
- `src/pages/about.astro` - About page
- `src/pages/services.astro` - Services page
- `src/pages/contact.astro` - Contact page
- `src/pages/blog.astro` - Blog placeholder
- `src/styles/global.css` - Global styles
- `tailwind.config.mjs` - Tailwind configuration
- `astro.config.mjs` - Astro configuration
- `package.json` - Dependencies
- `design/design-system.json` - Design system documentation