# Design System Strategy: The Digital Architect

## 1. Overview & Creative North Star
The North Star for this design system is **"The Digital Architect."** In a world of cluttered ed-tech templates, we position our interface as a precise, authoritative, yet breathable workspace. We move beyond "standard startup" aesthetics by treating the UI not as a flat screen, but as a series of curated, layered planes. 

We break the "template" look through **Intentional Asymmetry**—using generous white space on one side of a layout to balance dense information on the other. We reject the rigid 1px grid in favor of **Tonal Logic**, where depth and hierarchy are communicated through sophisticated color shifts rather than structural lines. The result is a premium, high-contrast experience that feels both academically rigorous and digitally native.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
Our palette is anchored by the authoritative `primary` (#003263) and the energetic `secondary` (#005ab6). However, the "soul" of the system lies in how we manage our whites and blues.

*   **The "No-Line" Rule:** To achieve a high-end editorial feel, designers are **prohibited** from using 1px solid borders to section off large content areas. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` (#f0f3ff) section should sit directly against a `surface` (#f9f9ff) background to create a "silent" edge.
*   **Surface Hierarchy & Nesting:** Treat the UI as stacked sheets of fine paper. 
    *   **Level 0 (Base):** `surface` (#f9f9ff)
    *   **Level 1 (Sections):** `surface-container-low` (#f0f3ff)
    *   **Level 2 (Interactive Cards):** `surface-container-lowest` (#ffffff)
*   **The "Glass & Gradient" Rule:** To elevate main CTAs and Hero sections, use a subtle linear gradient transitioning from `primary` (#003263) to `primary-container` (#1c4980) at a 135-degree angle. For floating navigation or over-content overlays, use **Glassmorphism**: a background of `surface` at 70% opacity with a `20px` backdrop-blur.

---

## 3. Typography: Editorial Authority
We utilize **Inter** exclusively. Its geometric precision provides the "Startup" energy, while our scale provides the "Editorial" weight.

*   **Display (lg/md/sm):** Used for "Big Ideas" and Hero statements. Keep tracking at `-0.02em` to feel tight and custom.
*   **Headline & Title:** Use `primary` (#003263) for all headlines to maintain high-contrast authority.
*   **Body (lg/md/sm):** Use `on-surface-variant` (#434750) for long-form text. This slight softening from pure black reduces eye strain while maintaining a "printed" feel.
*   **The Hierarchy Rule:** Never pair a Headline and a Title of the same weight. If the Headline is Bold (700), the Title must be Regular (400) or Medium (500) to ensure the eye knows exactly where the "story" begins.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are often a crutch for poor contrast. In this system, we use **Tonal Layering**.

*   **The Layering Principle:** Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f0f3ff) background. This creates a natural "lift" that feels integrated into the architecture.
*   **Ambient Shadows:** When an element must float (e.g., a Modal or Hover state), use a shadow that mimics natural light: `box-shadow: 0 12px 32px -4px rgba(0, 27, 59, 0.06);`. Note the use of a tinted shadow color (`on-background`) rather than grey.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., input fields), use the `outline-variant` token at **20% opacity**. 100% opaque borders are strictly forbidden for layout containers.

---

## 5. Components

### Buttons & CTAs
*   **Primary:** Gradient of `primary` to `primary-container`. `8px` rounded corners. No border.
*   **Secondary:** `surface-container-lowest` background with an `outline-variant` (20% opacity) "Ghost Border."
*   **Tertiary:** Pure text using `secondary` (#005ab6) with a `2px` underline that appears only on hover.

### Cards & Lists
*   **Forbid Dividers:** Do not use lines to separate list items. Use `spacing-4` (1rem) of vertical white space or a alternating subtle background shift between `surface-container-low` and `surface`.
*   **Interactive Cards:** Must use `rounded-md` (0.75rem). On hover, transition the background to `surface-container-highest` (#d5e3ff) rather than increasing shadow depth.

### Input Fields
*   **State Logic:** Default state uses the "Ghost Border." Focus state switches to a `2px` solid `secondary` (#005ab6) border with a soft `secondary-fixed` (#d7e3ff) outer glow.

### Chips & Badges
*   **Selection Chips:** Use `secondary-container` (#0072e4) with `on-secondary` (#ffffff) text. Keep corners `full` (9999px) for a distinct "pill" shape that contrasts with the architectural cards.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical margins (e.g., 80px left, 120px right) in Hero sections to create visual interest.
*   **Do** use `tertiary` (#765b00) for "Achievement" or "Premium" badges to inject warmth into the blue-heavy palette.
*   **Do** leverage `surface-bright` for areas meant to capture the user's immediate attention.

### Don't:
*   **Don't** use 1px solid #CCCCCC borders. They look like "default" web components and break the architectural feel.
*   **Don't** use pure black (#000000). Always use `on-surface` (#001b3b) to ensure the colors feel "in-gamut" with our deep blues.
*   **Don't** crowd elements. If you are unsure, add one more level of the `spacing-scale` (e.g., move from `spacing-8` to `spacing-10`). This system thrives on "Breathing Room."