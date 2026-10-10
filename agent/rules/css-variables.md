# Style values are CSS variables, not hard-coded in `className`

## Rule

- Colors, gradients, shadows, opacities and radii that are reused must be declared as **CSS variables** in `src/index.css` and used by name.
- **Never** write absolute values in a Tailwind `className`: `bg-[#e8a3a3]`, `text-[#5a4632]`, `from-[#f6dfc8]`, `shadow-[0_6px_18px_oklch(...)]`, `rounded-[13px]`.
- No hex/oklch/rgb color literal is allowed in `.tsx` or `.ts` files. Colors live only in `src/index.css`.

## How

1. Declare in `@theme` (to get a Tailwind utility) or in `:root`/`.dark` (plain variable):

   ```css
   @theme {
     --color-card-front: #f6dfc8;
     --color-card-back: #e8c49a;
     --color-on-card: #5a4632;
   }
   ```

2. Use it by its meaningful name:

   ```tsx
   <div className="bg-card-front text-on-card" />
   ```

3. Complex styles (gradients, layered shadows) become a `@utility` in `src/index.css`, like `glass`, `glass-heavy`, `app-bg`. Components only reference the utility name.

## Naming

- Name by **role**, not by value: `--color-civilian`, not `--color-green`.
- One prefix per family: `--color-group-*`, `--color-avatar-*`, `--color-splash-*`.
- Re-theming must only require editing `src/index.css`.

## Exceptions

- Values computed at runtime (drag position, library-generated `transform`) go through `style`.
- One-off layout numbers (`w-30`, `max-w-56`) may use the Tailwind scale; no bracket values for colors or shadows.

## Check

Searching `src/**/*.tsx` for `\[#` and `oklch(` must return nothing.
