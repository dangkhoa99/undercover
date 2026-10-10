# Split components into clear files

## Rule

- **One main component per file**, file name equals component name (`GlassButton.tsx` exports `GlassButton`). A small helper (under about 30 lines) used only there may share the file.
- When a block of JSX has its own name (a card, a dialog, a list row, a form), extract it into its own file instead of nesting it in a page.
- Pages (`src/pages/*`) only compose layout and wire store data. Detailed UI lives in `src/components/`.
- Logic that does not depend on React (game rules, word picking, scoring) lives in `src/game/`, never inside a component.
- Reusable hooks go in `src/hooks/` (one `use*.ts` per hook).

## Where files go

| Kind                               | Folder                        |
| ---------------------------------- | ----------------------------- |
| shadcn primitives                  | `src/components/ui/`          |
| Components shared by several pages | `src/components/`             |
| Game-screen components             | `src/components/game/`        |
| Components of one large page       | `src/components/<page-name>/` |
| Pages (routes)                     | `src/pages/`                  |

## Built for reuse

- Small, well-named, typed props. Accept `className` and merge it with `cn()`.
- Presentational components do not read the store. Data and callbacks come through props; only "container" components connect to the store.
- No hard-coded user-facing strings; every visible text goes through i18n (`en.json` and `vi.json`).
- Use a `Record` for static lookups instead of `if`/`switch` chains.
- No one-line wrapper functions that only rename something.
- Constants for ids (such as roles) use `TITLE_CASE` keys.

## Built for debugging

- Meaningful component names so React DevTools and stack traces are readable. No anonymous components (`export default () =>`).
- One responsibility per component: if the description needs "and", split it.
- A file over about 150 lines is a sign it needs splitting.
- Do not keep unrelated `useState` calls in one component; move state down to the child that owns it.

## Before finishing

- Is any JSX block repeated twice or more? Extract it.
- Does each file name match its component?
- `bun run build`, `bun run lint` and `bun run test` all pass.
