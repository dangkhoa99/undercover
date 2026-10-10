# Code style

## Components

- Components are **const arrow components typed with `React.FC`**. **Every** function (components, hooks, helpers, engine/store functions, tests) is a `const` arrow function; `function` declarations are banned (`func-style: expression` in oxlint). Define a const before its first use.

  ```tsx
  export const ScoreRow: React.FC<ScoreRowProps> = ({ player, total }) => {
    return <li>{player.name}</li>
  }
  ```

- Use `import React from 'react'` (plus any hooks) so `React.FC` resolves. Props get an `interface <Name>Props`.
- Keep named exports (`export const Name: React.FC<…>`); the project does not use default exports for components (route/App entry files excepted).
- **No non-null assertions** (`!`): lint-enforced (`typescript/no-non-null-assertion`). Narrow with an early return, a guard, or a typed lookup instead.
- `React.memo`: write a plain component first, then wrap it at the end of the file. Keep the inner name meaningful (`<Name>View`), export the memoised one under the public name, add a custom equality function only when needed:

  ```tsx
  const ScoreRowView: React.FC<ScoreRowProps> = (props) => { … }

  export const ScoreRow = React.memo(ScoreRowView)
  // or React.memo(ScoreRowView, areEqual)
  ```

- Split a component when it re-renders for reasons that do not concern all of its JSX: move fast-changing state (timers, inputs, drag) into the smallest child, and use `React.memo` for list rows and other children that receive stable props.

## Import blocks

Three blocks, separated by one blank line, in this order:

1. React-related (`react`, `react-dom`, `react-router-dom`, `react-i18next`)
2. Third-party libraries (`motion/react`, `lucide-react`, `zustand`, `@dnd-kit/*`, …)
3. In-repo modules (`@/…`, `./…`), and `import type` of repo modules

```tsx
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { motion } from 'motion/react'

import { ROLE } from '@/const/roles'
import { useGameStore } from '@/store/gameStore'
```

## Flow and readability

- **Early return**: handle guards and error cases first and return; avoid nested `else`.
- Logic always sits inside **braces**: `if`/`else`/`for`/`while` bodies and every `switch` `case` (`curly: all` in oxlint). Prefer a `Record` lookup over `switch`; never leave a brace-less one-liner body.
- Separate logical blocks with a blank line: hooks, derived values, handlers, effects, return.
- Separate big sections of a long file with a divider comment of exactly 50 dashes:

  ```ts
  // --------------------------------------------------
  ```

- Blank lines between sibling JSX blocks (header, list, footer, dialogs) for readability.
- Every `useEffect` **returns a cleanup function**, even when there is nothing to clean (`return () => {}`).

## Comments

- Remove comments that restate the code. Keep only the important ones: why a decision was taken, a non-obvious constraint, a gotcha, or a public contract (short JSDoc on exported helpers and hooks).

## Tailwind classes

- Do not pile every class into one string. Group them with `cn()` by concern (layout, spacing, typography, color, state), one argument per concern, and conditional parts as separate arguments.

  ```tsx
  className={cn(
    'flex items-center gap-3',
    'rounded-lg px-3 py-2',
    'text-sm font-semibold',
    alive ? 'bg-alive/25' : 'bg-black/30',
    className,
  )}
  ```

## Magic values

- Enforced by oxlint `no-magic-numbers` (allowed: 0, 1, -1, 2; off in `src/const`, tests and `src/data`).
- String unions are never typed by hand. Declare a const object in `src/const/` (`TITLE_CASE` keys, `as const`) and derive the type: `type Phase = (typeof PHASE)[keyof typeof PHASE]`. Code uses the const (`PHASE.VOTE`), never the literal `'vote'`.
- No magic numbers or magic strings in logic or JSX. Name them in `src/const/` (see `structure.md`): durations, sizes, limits, storage keys, routes, ids, class lookups.
- Tailwind scale classes are fine; repeated pixel values, timings, thresholds, storage keys and paths are not.
