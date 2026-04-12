# Design System: Industrial Monolith

## 1. Overview & Creative North Star
**Creative North Star: The Structural Vanguard**

Industrial Monolith is a design system forged from the aesthetics of heavy infrastructure, precision engineering, and high-stakes craftsmanship. It rejects the "softness" of consumer web design in favor of a brutalist, editorial precision. 

The system is characterized by:
*   **Architectural Gridwork:** Leveraging linear elements that mimic scaffolding pipes and structural braces.
*   **Intentional Asymmetry:** Breaking traditional layout expectations to create a sense of dynamic progress and "scaffolding in progress."
*   **Monochromatic Depth:** A high-contrast dark environment punctuated by a singular, high-visibility "Safety Red" (Primary).

## 2. Colors
The palette is rooted in the "Safety & Steel" spectrum.

*   **Primary (#E63946):** A high-visibility warning red used for critical actions and structural accents.
*   **Neutral Foundation:** A deep spectrum of blacks and charcoals (#0a0a0a to #1e1e1e) representing industrial surfaces like asphalt and steel.
*   **The "No-Line" Rule:** Sectioning is achieved through background shifts (e.g., transitioning from `surface` #0a0a0a to `surface_container` #141414). 1px borders are strictly limited to the "Ghost Border" pattern for UI components, never for layout sectioning.
*   **Surface Hierarchy:** 
    *   **Level 0 (Background/Lowest):** #000000 - Absolute void for maximum contrast.
    *   **Level 1 (Surface):** #0a0a0a - The default canvas.
    *   **Level 2 (Container):** #1e1e1e - Raised "slabs" for content grouping.
*   **Signature Textures:** Use linear gradients (90deg or 145deg) to simulate the metallic sheen of pipes or the density of concrete slabs.

## 3. Typography
The typography scale utilizes a "Precision vs. Humanism" pairing.

*   **Display & Headlines (Space Grotesk):** A technical, wide-set sans-serif that feels engineered. Used in all-caps for a rhythmic, industrial cadence.
*   **Body (Manrope):** A highly legible geometric sans-serif for long-form content, balanced to feel both modern and functional.

**Extracted Scale Ground Truth:**
*   **Display XL:** 120px (7.5rem) - Used for Hero statements, tracking-tighter, leading-none.
*   **Headline Large:** 60px (3.75rem) / 80px (5rem).
*   **Title/Subhead:** 36px (2.25rem) to 48px (3rem).
*   **Body Large:** 20px (1.25rem) for high-impact intro text.
*   **Body Standard:** 14px (0.875rem) to 16px (1rem).
*   **Label/Utility:** 10px (0.625rem) to 12px (0.75rem) - Always uppercase, tracking-widest (0.2em - 0.4em).

## 4. Elevation & Depth
Depth is conveyed through "Industrial Slabs" rather than standard card shadows.

*   **The Layering Principle:** Content sits on "Industrial Slabs"—rectilinear containers with a 4px left-border accent in the primary color.
*   **Ambient Shadows:**
    *   **Structural Shadow:** `10px 10px 20px rgba(0, 0, 0, 0.4)` - Used to pop major content blocks.
    *   **Inset Pipe Shadow:** `inset -2px 0 5px rgba(0, 0, 0, 0.5)` - Used for progress bars and recessed UI elements.
*   **Glassmorphism:** Use `backdrop-blur-md` with a 90% opacity background for persistent navigation to maintain a sense of space while scrolling.

## 5. Components
### Buttons
*   **Primary:** Sharp corners (roundedness: 0), solid #E63946 background, white uppercase text, wide tracking.
*   **Ghost:** 1px white/20% border, transparent background, hover state adds a 10% white overlay.

### Industrial Slabs (Cards)
*   Background: Linear gradient (145deg, #1e1e1e, #141414).
*   Accent: 4px solid Primary left border.
*   Interaction: On hover, an internal progress line (1px high) expands from 0% to 100%.

### Progress Scaffolding
*   Vertical bar tracking page scroll, utilizing a high-glow shadow `0 0 15px rgba(230,57,70,0.8)` to simulate a laser-precision measurement tool.

### Input Fields
*   Background: #1a1a1a (Surface Variant).
*   Border: Bottom-only or minimal 1px outline in #3f3f3f.
*   Focus: Immediate shift to Primary red border.

## 6. Do's and Don'ts
### Do:
*   Use high-contrast monochromatic photography (grayscale).
*   Leverage "structural" lines (1px width, low opacity) to guide the eye.
*   Use extreme font weight variations (Black vs. Light) to create hierarchy.
*   Embrace large amounts of whitespace (Spacing: 3) to mimic the scale of industrial sites.

### Don't:
*   Do not use rounded corners (Radius > 4px). This system is built on "The Angle."
*   Do not use soft, colorful gradients. Stick to metal, stone, and shadow.
*   Do not use standard icons without a technical, "blueprint" feel.
*   Do not use borders to separate main layout sections; use background color shifts instead.