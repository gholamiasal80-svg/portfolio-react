# React + Vite Conversion Summary

Complete conversion of the Next.js portfolio website to React + Vite.

## Project Structure

```
portfolio-react/
├── index.html                          # HTML entry point with Google Fonts
├── package.json                        # Dependencies and scripts
├── vite.config.js                      # Vite configuration with Tailwind
├── src/
│   ├── main.jsx                        # React app entry point
│   ├── App.jsx                         # Router configuration with all routes
│   ├── styles/
│   │   └── globals.css                 # Complete design system (copied from Next.js)
│   ├── components/
│   │   ├── Header.jsx                  # Navigation with mobile menu
│   │   ├── Footer.jsx                  # Footer with links and contact info
│   │   ├── HeroPortrait.jsx            # Eye-tracking portrait component
│   │   └── PaperTexture.jsx            # Canvas-based texture overlay
│   └── pages/
│       ├── Home.jsx                    # Homepage with hero and featured work
│       ├── Work.jsx                    # Project gallery with physics simulation
│       ├── About.jsx                   # About page with pull-to-reveal animation
│       ├── Contact.jsx                 # Contact form with breathing animation
│       └── FineArt.jsx                 # Fine art gallery with hanging layout
└── public/
    └── README-assets.txt               # Instructions for copying image assets
```

## Key Conversions

### Routing
- **From:** Next.js file-based routing (`/app` directory)
- **To:** React Router v6 with explicit routes in `App.jsx`

### Navigation
- **Header.jsx:** Replaced `next/link` with `react-router-dom` Link
- **Footer.jsx:** Replaced `next/link` with `react-router-dom` Link
- Removed `usePathname()` from Next.js, replaced with `useLocation().pathname`

### Components
All components successfully converted from TypeScript to JavaScript:
1. **Header** - Mobile hamburger + desktop nav bar (no changes to logic/styling)
2. **Footer** - Contact info, nav links, scroll-to-top (no changes to logic/styling)
3. **HeroPortrait** - Eye tracking mouse movement (all physics logic preserved)
4. **PaperTexture** - Canvas texture generation (all logic preserved)

### Pages

#### Home.jsx
- Hero section with eye-tracking portrait
- Featured project card
- Values strip (3-column grid)
- CTA band
- All animations and styling identical

#### Work.jsx
- **Physics simulation completely intact:** Spring physics for hanging cards
- Clothesline SVG string with bezier curves
- Draggable cards with pointerdown/pointermove events
- Filter sidebar with arm animation
- All displacement filters and SVG animations preserved

#### About.jsx
- Pull-to-reveal interaction (image sliding mechanics preserved)
- Philosophy and approach sections
- Bio and stats grid
- All easing functions and animations identical

#### Contact.jsx
- Contact form with validation
- Breathing animation on illustration
- Floating Z's animation
- Form submission feedback
- All animations and keyframes preserved

#### FineArt.jsx
- Catenary string path calculation (mathematical function preserved)
- Multiple hanging rows with different configurations
- Lightbox modal for artwork viewing
- Filter sidebar with arm animation
- All complex SVG geometry and animations preserved

## CSS

- **globals.css:** Entire design system copied verbatim from Next.js version
  - Custom properties (--sp-*, --fs-*, colors, etc.)
  - Tailwind integration
  - All utility classes (.btn-primary, .link-underline, etc.)
  - All animations (@keyframes)
  - Responsive media queries
  - Component-specific styles

## Dependencies

### Production
- `react@^18.3.1`
- `react-dom@^18.3.1`
- `react-router-dom@^6.22.3`

### Development
- `vite@^5.4.2`
- `@vitejs/plugin-react@^4.3.1`
- `tailwindcss@^4.0.0`
- `@tailwindcss/vite@^4.0.0`

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy image assets from v07/public/ to portfolio-react/public/

3. Update vite.config.js base path if deploying to a different URL

4. Development server:
   ```bash
   npm run dev
   ```

5. Production build:
   ```bash
   npm run build
   ```

6. Preview build:
   ```bash
   npm run preview
   ```

## Important Notes

- All TypeScript types removed (React Hooks return types are inferred)
- All "use client" directives removed (not needed in React client-side app)
- All physics simulation code preserved exactly
- All SVG filtering and animation logic preserved
- All CSS animations and keyframes preserved
- Responsive design maintained
- Google Fonts imported in index.html

## Files to Copy Manually

Copy these image files from `/sessions/practical-confident-carson/mnt/assignment-2-Asal-Gholami/v07/public/` to `portfolio-react/public/`:

- hero-face.png
- left-eye.png
- right-eye.png
- hand-string.png
- hands.png
- me.png
- about-face.png
- contact-sleepy.png
- cliper1.png
- work1.jpg, work2.jpg, work3.jpg
- art1.png through art5.png
- Any .html or .svg files needed
