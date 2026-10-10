# Contrast: no pastel text on pastel backgrounds

## Rule

- Pastel-colored text (role labels, warnings, scores…) is only placed on **dark** surfaces. The page background is dark (`--color-app-bg`), so any surface holding such text must stay dark too.
- Glass surfaces use the `glass*` utilities (no extra dark layer; the page background is plain `--color-app-bg`). If the page background ever gets colored glows again, re-add a dark layer under glass. A non-glass block with pastel text needs a dark background (`bg-black/30` or stronger).
- Every new pastel background comes with a matching `--color-on-*` token in `src/index.css`.

## Check

- Normal text needs at least 4.5:1 contrast; large text (24px+, or 19px+ bold) at least 3:1.
- Look at the real UI in the corners where the pastel glow is strongest (top left, bottom right), not only the center.
- Do not fix contrast by switching to pure white on pastel; switch to the dark `on-*` color.
