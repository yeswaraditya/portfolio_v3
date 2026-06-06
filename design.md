# Design System & Language

## Color Palette

### Primary Colors
- **Background**: `#EEEEEE` (Light Gray)
  - Used for main page backgrounds and card backgrounds
  - Creates a clean, minimal canvas
- **Foreground/Text**: `#000000` (Pure Black)
  - Primary text color for maximum contrast
  - All standard typography uses this

### Accent Colors
- **Accent Orange**: `#FF6E00`
  - Used for interactive hover states (links)
  - Used in hero section text on black background
  - Transition overlay color for page navigation
  - Strong call-to-action color
- **Accent Yellow**: `#FFD700` (Golden)
  - Defined in theme but not heavily used currently
  - Reserved for future highlights/accents

### Secondary Colors
- **Light Gray**: `#E0E0E0` / `#F0F0F0`
  - Used for button backgrounds and subtle overlays
  - Provides visual hierarchy without harsh contrast
- **Gray Borders**: `#D0D0D0` / `var(--gray-400)`
  - Used extensively for section dividers
  - Creates structured grid-like layouts

---

## Typography

### Font Families
- **Sans Serif (Primary)**: Inter
  - Used for all body text and headings
  - Clean, modern, highly readable
  - Weights: 400 (regular), 700 (bold)

- **Monospace (Secondary)**: Space Mono
  - Used for UI labels, metadata, timestamps
  - Available as CSS variable: `var(--font-space-mono)`
  - Weights: 400, 700
  - Conveys technical/code-like aesthetic

### Typographic Hierarchy

#### Headings
- **Hero Title**: `text-5xl md:text-8xl` - Bold, tracking-tighter
  - Example: "ART" in hero section
- **Section Heading**: `text-6xl md:text-8xl lg:text-9xl` - Bold, tracking-tighter
  - Example: "WHO AM I", "UPDATES..."
- **Smaller Heading**: `text-2xl md:text-4xl` - Medium weight
- **Subheading**: `text-sm md:text-xl` - Regular weight, monospace
  - Used for secondary text, "art won't save it"

#### Body Text
- **Standard**: `text-base` - Inter, regular weight
- **Small**: `text-sm` - For secondary information
- **Mono Labels**: `text-[10px] md:text-sm` - Space Mono, uppercase, tracking-widest

### Text Styling
- **Tracking**: Used extensively
  - `tracking-tighter` (compressed) for impact headlines
  - `tracking-wide` and `tracking-widest` for labels and metadata
  - Creates sophisticated, readable typography
- **Line Height**: Default for body text
  - `leading-none` for compressed headlines (maximum impact)
  - `leading-relaxed` for paragraphs

---

## Layout & Spacing

### Grid System
- Border-based layout (not CSS Grid)
- Boxes defined by visible borders: `border border-gray-400`
- Creates structured, scannable layouts
- Responsive by collapsing borders and reorganizing on smaller screens

### Section Structure
- **Hero Section**: Absolute positioned boxes with overlapping layouts
  - Portrait with precise corner crosshairs (+)
  - Leaf animation boxes (pink left, violet top-center)
  - Black content box (center) with orange text
  - Language toggle box (bottom-left)

- **Bottom Grid**: Flex-based with border dividers
  - "WHO AM I" section (left, full-width on mobile)
  - Playlist widget and coffee section (right column, hidden on mobile)
  - Bottom ticker with motivational text

- **Updates Section**: Alternating left/right blocks
  - Update blocks with image and text
  - Staggered, scroll-triggered reveals
  - Max-width constraints for readability

### Spacing Conventions
- **Padding**: `p-4 md:p-8 lg:p-12` (responsive scaling)
- **Gap**: `gap-6`, `gap-8`, `gap-32` (semantic vertical spacing)
- **Margins**: Minimal explicit margins; relies on padding and gaps

---

## Component Patterns

### Boxes & Cards
- Border: `1px solid border-gray-400`
- Background: `bg-white` or `bg-[#F0F0F0]` (slight elevation)
- Padding: `p-3` to `p-8` (context-dependent)
- Used for: Leaf imagery, text blocks, playlist widget

### Interactive Elements
- **Hover State**: `hover:text-accent-orange transition-colors`
- **Click State**: `active:scale-95` (slight compression)
- **Scale Transform**: `hover:scale-110` for icons
- **Transitions**: Smooth `transition-all duration-[time]`
- **Cursor**: Custom finger cursor replaces default pointer

### Buttons & Controls
- **Black Button**: `bg-black rounded-full p-2` with white icon
- **Icon Buttons**: No background, scale on hover
- **Toggle States**: Visual feedback via color/opacity changes

### Borders & Dividers
- Horizontal: `border-t` or `border-b border-gray-300`
- Vertical: `border-r` or `border-l border-gray-300`
- Used to create visual hierarchy and section separation
- Consistent line weight throughout

---

## Animation & Motion

### Animation Framework
- **Primary Tool**: GSAP (GreenSock Animation Platform)
- **React Integration**: `@gsap/react` (useGSAP hook)
- **Plugins**: ScrollTrigger for scroll-based animations

### Motion Principles
- **Ease Functions**: `power3.out`, `power3.inOut` (natural, bouncy feel)
- **Duration**: Typically 0.8s - 1.5s for micro-interactions
- **Delay**: Staggered reveals with 0.1s - 0.2s delays between items
- **Opacity**: Fade in from 0 to 1
- **Position**: Translate from bottom (y: 40-50) upward on reveal

### Specific Animations

#### Hero Section
- **Initial Reveals**: Elements animate from bottom with fade-in
  - `.hero-element`: `y: 50, opacity: 0` → `duration: 1, stagger: 0.2`
- **Leaf Animations**: 
  - Violet leaves slide left-to-right (xPercent: 0 → 100)
  - Pink leaves slide right-to-left (xPercent: 100 → 0)
  - Both: `duration: 1.5, ease: power3.inOut, delay: 0.5`

#### Page Transitions
- **Circle Reveal**: Circular clip-path animation
  - Origin: Click position
  - Expands outward to cover screen
  - Background color: Accent orange
  - Duration: ~1s
- **Text Animation**: Text moves to center while fading, mid-way text swap
- **Momentum**: Smooth, natural deceleration (power3.inOut)

#### Scroll-Triggered Reveals
- **Update Blocks**: Trigger when 85% in view
  - Reveal from bottom with opacity fade
  - Staggered by block index
  - Duration: 0.8s with ease-out
- **Lazy Loading**: Animations only fire when scrolled into view

#### Music Visualizer
- **Animated Bars**: `animation: music-bar 0.8s ease-in-out infinite`
  - Multiple bars with different durations (0.8s, 1.2s, 0.9s)
  - Height oscillates: 3px → 12px
- **Spin Animation**: `animation: spin-slow 8s linear infinite`
  - Used for asterisk icon in bottom ticker

### Transition Classes
- `transition-colors` - Color changes (1-3ms implied)
- `transition-opacity` - Opacity changes
- `transition-transform` - Scale and translate
- `transition-all` - All properties (use judiciously)

---

## Interaction Patterns

### Hover States
- **Links**: `hover:text-accent-orange` (color change)
- **Buttons**: `hover:scale-110` (subtle grow)
- **Cards**: `hover:bg-white` (background elevation)
- **Opacity**: `hover:opacity-100` (reveal hidden text)

### Click Interactions
- **Scale Feedback**: `active:scale-95` (click compression)
- **Page Navigation**: Circle reveal transition with text transform
- **Toggle States**: Icon swap (play ↔ pause), opacity changes

### Custom Cursor
- **Element**: Finger image (`/finger.png`)
- **Size**: 96px × 96px (w-24 h-24)
- **Tracking**: GSAP smooth follow with 0.1s duration
- **Override**: `cursor: none !important` on all elements
- **Z-index**: `z-[999999]` (above everything)
- **Offset**: Centered with `translate(-10%, -10%)`

### Keyboard & Screen Reader
- Semantic HTML structure maintained
- ARIA considerations in navigation
- Accessible color contrasts (black on light gray)

---

## Visual Style Elements

### Imagery
- **Portrait**: Centered, bordered, with precise corner crosshairs
- **Leaf Imagery**: Pink/violet leaves, crop-animated
- **Organic Shapes**: Leaves provide softness against geometric structure
- **Aspect Ratios**: 
  - Portrait: `w-[25vw] h-[35vw]` (portrait orientation)
  - Landscape: `w-[25vw] h-[8vw]` (wide, shallow boxes)

### Borders & Frames
- **Consistent Width**: 1px borders throughout
- **Color**: Gray-400 (#999 range)
- **Purpose**: Visual structure and scanning guides
- **Crosshairs**: `+` symbols at four corners of portrait, offset outward

### Empty Space & Whitespace
- **Large Gaps**: Strategic use of empty space for breathing room
- **Padding**: Generous padding inside bordered elements
- **Asymmetry**: Right-aligned heading "UPDATES...", left-aligned blocks below
- **Visual Balance**: Content arranged to guide eye through page

### Micro-Interactions
- **Music Player Visualizer**: Dynamic bars responding to playback
- **Playlist Grid**: 3-column grid of track indicators
  - Active track: Glow effect (`shadow-[0_0_10px_rgba(37,99,235,0.4)]`)
  - Inactive: Neutral gray
- **Ticker Animation**: Asterisk spinning continuously
- **Language Modal**: Dismissible with translation options

---

## Responsive Design

### Breakpoints (Tailwind)
- **Mobile**: Default (no prefix)
- **Tablet**: `md:` (768px+)
- **Desktop**: `lg:` (1024px+)

### Responsive Adjustments
- **Typography**: Scales with viewport (e.g., `text-5xl md:text-8xl`)
- **Spacing**: Padding adjusts (e.g., `p-4 md:p-8`)
- **Layout**: Columns collapse/reorganize
  - Bottom grid: Full-width "WHO AM I" on mobile, split on desktop
  - Updates: Maintains left/right alternation but adjusts spacing
- **Images**: Use fixed aspect ratio containers with overflow hidden
- **Navigation**: Links may hide on small screens (`hidden md:inline-block`)

### Mobile-First Philosophy
- Base styles apply to mobile
- Modifiers add complexity at larger breakpoints
- Touch-friendly spacing and targets
- Custom cursor hidden on touch devices (relies on system pointer)

---

## Accessibility

### Color Contrast
- Black (#000) on Light Gray (#EEEEEE): 17.6:1 (AAA)
- Orange (#FF6E00) on Black: 4.5:1 (AA, large text)
- High readability throughout

### Focus & Interaction
- Hover states provide visual feedback
- Links have clear hover color (orange)
- Buttons have click feedback (scale)
- Custom cursor indicates interactive elements

### Semantic Structure
- Proper heading hierarchy (h1, h2)
- Landmark elements (header, main, footer, section)
- Alt text on images
- Language context provided

### Motion
- No forced animations on load (respects user preferences implicitly via CSS animations)
- Scroll-triggered animations are optional enhancements
- Animations use reasonable durations (not too fast, not too slow)

---

## Design Tokens Summary

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#EEEEEE` | Page background |
| `--foreground` | `#000000` | Text color |
| `--accent-orange` | `#FF6E00` | Hover, accents |
| `--accent-yellow` | `#FFD700` | Reserved |
| `--font-sans` | Inter | Body text |
| `--font-mono` | Space Mono | Labels |
| Border Color | `#D0D0D0` | Dividers |
| Light BG | `#F0F0F0` | Cards |
| Animation Ease | `power3.out/inOut` | Smooth motion |
| Custom Cursor | Finger image | Branding |

---

## Design Philosophy

1. **Minimalism with Personality**: Clean light background with bold typography and custom elements
2. **Grid Meets Organic**: Structured borders with organic leaf imagery
3. **Technical Aesthetic**: Monospace fonts and precise alignment communicate competence
4. **Motion as Polish**: Smooth, intentional animations enhance rather than distract
5. **Interaction Matters**: Custom cursor and transitions make interface feel responsive and alive
6. **Accessibility First**: High contrast, semantic HTML, clear navigation
7. **Content Hierarchy**: Clear visual weight guides user attention
8. **Responsive by Default**: Mobile-first approach ensures usability everywhere

---

## Future Considerations

- **Accent Yellow**: Underutilized; potential for highlight states or accent elements
- **Dark Mode**: Design is light-centric; dark mode would require comprehensive palette rethink
- **Animation Preferences**: Consider `prefers-reduced-motion` for accessibility
- **Performance**: Monitor GSAP animations on lower-end devices
- **Extended Palette**: Consider secondary grays or additional accent colors for feature expansion
